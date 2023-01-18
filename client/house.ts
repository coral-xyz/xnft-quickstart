import * as anchor from "@project-serum/anchor";
import * as spl from "../spl-token";
import {
  PublicKey,
  Signer,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { sleep } from "@switchboard-xyz/sbv2-utils";
import {
  OracleQueueAccount,
} from "@switchboard-xyz/switchboard-v2";
import { HouseState, HouseStateJSON } from "./generated/accounts";
import { FlipProgram } from "./types";

export class HouseAccountDoesNotExist extends Error {
  readonly name = "HouseAccountDoesNotExist";
  readonly msg = "Failed to fetch the HouseState account.";

  constructor() {
    super("HouseAccountDoesNotExist: Failed to fetch the HouseState account.");
  }
}

export interface HouseJSON extends HouseStateJSON {
  publicKey: string;
}

export class House {
  program: FlipProgram;
  publicKey: PublicKey;
  state: HouseState;

  constructor(program: FlipProgram, publicKey: PublicKey, state: HouseState) {
    this.program = program;
    this.publicKey = publicKey;
    this.state = state;
  }

  static fromSeeds(program: FlipProgram): [PublicKey, number] {
    return anchor.utils.publicKey.findProgramAddressSync(
      [Buffer.from("HOUSESTATESEED")],
      program.programId
    );
  }

  async reload(): Promise<void> {
    const newState = await HouseState.fetch(
      window.xnft?.solana.connection,
      this.publicKey
    );
    if (newState === null) {
      throw new Error(`Failed to fetch the new House account state`);
    }
    this.state = newState;
  }

  toJSON(): HouseJSON {
    return {
      publicKey: this.publicKey.toString(),
      ...this.state.toJSON(),
    };
  }

  getQueueAccount(switchboardProgram: anchor.Program): OracleQueueAccount {
    const queueAccount = new OracleQueueAccount({
      program: switchboardProgram as any,
      publicKey: this.state.switchboardQueue,
    });
    return queueAccount;
  }

  static async create(
    program: FlipProgram,
    switchboardQueue: OracleQueueAccount,
    mintKeypair = anchor.web3.Keypair.generate()
  ): Promise<House> {
    const req = await House.createReq(program, switchboardQueue, mintKeypair);

    const signature = await program.provider.sendAndConfirm(
      new Transaction().add(...req.ixns),
      req.signers
    );

    let retryCount = 5;
    while (retryCount) {
      const houseState = await HouseState.fetch(
        window.xnft?.solana.connection,
        req.account
      );
      if (houseState != null) {
        return new House(program, req.account, houseState);
      }
      await sleep(1000);
      --retryCount;
    }

    throw new Error(`Failed to create new HouseAccount`);
  }

  static async createReq(
    program: FlipProgram,
    switchboardQueue: OracleQueueAccount,
    mintKeypair = anchor.web3.Keypair.generate()
  ): Promise<{
    ixns: TransactionInstruction[];
    signers: Signer[];
    account: PublicKey;
  }> {
    const payer = window.xnft?.solana;
    const [houseKey, houseBump] = House.fromSeeds(program);
console.log(houseKey.toBase58())
    const switchboardMint = await switchboardQueue.loadMint();

    const tokenVault = await spl.getAssociatedTokenAddress(
      mintKeypair.publicKey,
      houseKey,
      true
    );

    const txnIxns: TransactionInstruction[] = [
      await program.methods
        .houseInit({})
        .accounts({
          house: houseKey,
          authority: payer.publicKey,
          switchboardMint: switchboardMint.address,
          switchboardQueue: switchboardQueue.publicKey,
          mint: mintKeypair.publicKey,
          houseVault: tokenVault,
          payer: payer.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: spl.TOKEN_PROGRAM_ID,
          associatedTokenProgram: spl.ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .instruction(),
    ];

    return {
      ixns: txnIxns,
      signers: [mintKeypair],
      account: houseKey,
    };
  }

  static async load(program: FlipProgram): Promise<House> {
    const connection = window.xnft?.solana.connection;
    const [houseKey, houseBump] = House.fromSeeds(program);
    console.log(houseKey.toBase58())

    const payer = window.xnft?.solana;

    let houseState = await HouseState.fetch(connection, houseKey);
    if (houseState != null) {
      return new House(program, houseKey, houseState);
    }

    throw new Error(`House account has not been created yet`);
  }

  static async getOrCreate(
    program: FlipProgram,
    switchboardQueue: OracleQueueAccount
  ): Promise<House> {
    try {
      const house = await House.load(program);
      return house;
    } catch (error: any) {
      if (
        error.toString().includes("House account has not been created yet")
      ) {
        throw error;
      }
    }

    return House.create(program, switchboardQueue);
  }

  async loadMint(): Promise<spl.Mint> {
    const mint = await spl.getMint(
      window.xnft?.solana.connection,
      this.state.mint
    );
    return mint;
  }
}

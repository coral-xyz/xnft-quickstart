import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface HouseInitArgs {
  params: types.HouseInitParamsFields
}

export interface HouseInitAccounts {
  house: PublicKey
  authority: PublicKey
  switchboardMint: PublicKey
  switchboardQueue: PublicKey
  mint: PublicKey
  houseVault: PublicKey
  payer: PublicKey
  systemProgram: PublicKey
  tokenProgram: PublicKey
  associatedTokenProgram: PublicKey
  rent: PublicKey
}

export const layout = borsh.struct([types.HouseInitParams.layout("params")])

export function houseInit(args: HouseInitArgs, accounts: HouseInitAccounts) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.house, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.switchboardMint, isSigner: false, isWritable: false },
    { pubkey: accounts.switchboardQueue, isSigner: false, isWritable: true },
    { pubkey: accounts.mint, isSigner: true, isWritable: true },
    { pubkey: accounts.houseVault, isSigner: false, isWritable: true },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    {
      pubkey: accounts.associatedTokenProgram,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.rent, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([195, 3, 56, 49, 181, 185, 169, 109])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      params: types.HouseInitParams.toEncodable(args.params),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}

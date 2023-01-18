import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UserBetArgs {
  params: types.UserBetParamsFields
}

export interface UserBetAccounts {
  user: PublicKey
  house: PublicKey
  houseVault: PublicKey
  authority: PublicKey
  escrow: PublicKey
  vrf: PublicKey
  /** CHECK */
  oracleQueue: PublicKey
  queueAuthority: PublicKey
  /** CHECK */
  dataBuffer: PublicKey
  /** CHECK */
  permission: PublicKey
  vrfEscrow: PublicKey
  switchboardProgramState: PublicKey
  switchboardProgram: PublicKey
  payer: PublicKey
  vrfPayer: PublicKey
  flipPayer: PublicKey
  recentBlockhashes: PublicKey
  systemProgram: PublicKey
  tokenProgram: PublicKey
}

export const layout = borsh.struct([types.UserBetParams.layout("params")])

export function userBet(args: UserBetArgs, accounts: UserBetAccounts) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.user, isSigner: false, isWritable: true },
    { pubkey: accounts.house, isSigner: false, isWritable: false },
    { pubkey: accounts.houseVault, isSigner: false, isWritable: false },
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.escrow, isSigner: false, isWritable: true },
    { pubkey: accounts.vrf, isSigner: false, isWritable: true },
    { pubkey: accounts.oracleQueue, isSigner: false, isWritable: true },
    { pubkey: accounts.queueAuthority, isSigner: false, isWritable: false },
    { pubkey: accounts.dataBuffer, isSigner: false, isWritable: true },
    { pubkey: accounts.permission, isSigner: false, isWritable: true },
    { pubkey: accounts.vrfEscrow, isSigner: false, isWritable: true },
    {
      pubkey: accounts.switchboardProgramState,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.switchboardProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.payer, isSigner: true, isWritable: true },
    { pubkey: accounts.vrfPayer, isSigner: false, isWritable: true },
    { pubkey: accounts.flipPayer, isSigner: false, isWritable: true },
    { pubkey: accounts.recentBlockhashes, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([250, 141, 121, 127, 113, 52, 188, 61])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      params: types.UserBetParams.toEncodable(args.params),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}

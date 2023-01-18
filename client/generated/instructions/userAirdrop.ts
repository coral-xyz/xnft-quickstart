import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UserAirdropArgs {
  params: types.UserAirdropParamsFields
}

export interface UserAirdropAccounts {
  user: PublicKey
  house: PublicKey
  houseVault: PublicKey
  mint: PublicKey
  authority: PublicKey
  airdropTokenWallet: PublicKey
  tokenProgram: PublicKey
}

export const layout = borsh.struct([types.UserAirdropParams.layout("params")])

export function userAirdrop(
  args: UserAirdropArgs,
  accounts: UserAirdropAccounts
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.user, isSigner: false, isWritable: true },
    { pubkey: accounts.house, isSigner: false, isWritable: false },
    { pubkey: accounts.houseVault, isSigner: false, isWritable: true },
    { pubkey: accounts.mint, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: false, isWritable: true },
    { pubkey: accounts.airdropTokenWallet, isSigner: false, isWritable: true },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([250, 126, 22, 229, 135, 4, 49, 140])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      params: types.UserAirdropParams.toEncodable(args.params),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}

import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh"

export interface UserAirdropParamsFields {}

export interface UserAirdropParamsJSON {}

export class UserAirdropParams {
  constructor(fields: UserAirdropParamsFields) {}

  static layout(property?: string) {
    return borsh.struct([], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UserAirdropParams({})
  }

  static toEncodable(fields: UserAirdropParamsFields) {
    return {}
  }

  toJSON(): UserAirdropParamsJSON {
    return {}
  }

  static fromJSON(obj: UserAirdropParamsJSON): UserAirdropParams {
    return new UserAirdropParams({})
  }

  toEncodable() {
    return UserAirdropParams.toEncodable(this)
  }
}

import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh"

export interface UserSettleParamsFields {}

export interface UserSettleParamsJSON {}

export class UserSettleParams {
  constructor(fields: UserSettleParamsFields) {}

  static layout(property?: string) {
    return borsh.struct([], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UserSettleParams({})
  }

  static toEncodable(fields: UserSettleParamsFields) {
    return {}
  }

  toJSON(): UserSettleParamsJSON {
    return {}
  }

  static fromJSON(obj: UserSettleParamsJSON): UserSettleParams {
    return new UserSettleParams({})
  }

  toEncodable() {
    return UserSettleParams.toEncodable(this)
  }
}

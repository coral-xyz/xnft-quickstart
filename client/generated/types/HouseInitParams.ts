import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh"

export interface HouseInitParamsFields {}

export interface HouseInitParamsJSON {}

export class HouseInitParams {
  constructor(fields: HouseInitParamsFields) {}

  static layout(property?: string) {
    return borsh.struct([], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new HouseInitParams({})
  }

  static toEncodable(fields: HouseInitParamsFields) {
    return {}
  }

  toJSON(): HouseInitParamsJSON {
    return {}
  }

  static fromJSON(obj: HouseInitParamsJSON): HouseInitParams {
    return new HouseInitParams({})
  }

  toEncodable() {
    return HouseInitParams.toEncodable(this)
  }
}

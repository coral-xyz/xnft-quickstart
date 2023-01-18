import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh"

export interface GameConfigFields {
  numVrfRequests: number
  min: number
  max: number
  payoutMultiplier: number
}

export interface GameConfigJSON {
  numVrfRequests: number
  min: number
  max: number
  payoutMultiplier: number
}

export class GameConfig {
  readonly numVrfRequests: number
  readonly min: number
  readonly max: number
  readonly payoutMultiplier: number

  constructor(fields: GameConfigFields) {
    this.numVrfRequests = fields.numVrfRequests
    this.min = fields.min
    this.max = fields.max
    this.payoutMultiplier = fields.payoutMultiplier
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u8("numVrfRequests"),
        borsh.u32("min"),
        borsh.u32("max"),
        borsh.u32("payoutMultiplier"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new GameConfig({
      numVrfRequests: obj.numVrfRequests,
      min: obj.min,
      max: obj.max,
      payoutMultiplier: obj.payoutMultiplier,
    })
  }

  static toEncodable(fields: GameConfigFields) {
    return {
      numVrfRequests: fields.numVrfRequests,
      min: fields.min,
      max: fields.max,
      payoutMultiplier: fields.payoutMultiplier,
    }
  }

  toJSON(): GameConfigJSON {
    return {
      numVrfRequests: this.numVrfRequests,
      min: this.min,
      max: this.max,
      payoutMultiplier: this.payoutMultiplier,
    }
  }

  static fromJSON(obj: GameConfigJSON): GameConfig {
    return new GameConfig({
      numVrfRequests: obj.numVrfRequests,
      min: obj.min,
      max: obj.max,
      payoutMultiplier: obj.payoutMultiplier,
    })
  }

  toEncodable() {
    return GameConfig.toEncodable(this)
  }
}

import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh"

export interface UserBetParamsFields {
  gameType: number
  userGuess: number
  betAmount: BN
}

export interface UserBetParamsJSON {
  gameType: number
  userGuess: number
  betAmount: string
}

export class UserBetParams {
  readonly gameType: number
  readonly userGuess: number
  readonly betAmount: BN

  constructor(fields: UserBetParamsFields) {
    this.gameType = fields.gameType
    this.userGuess = fields.userGuess
    this.betAmount = fields.betAmount
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u32("gameType"), borsh.u32("userGuess"), borsh.u64("betAmount")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UserBetParams({
      gameType: obj.gameType,
      userGuess: obj.userGuess,
      betAmount: obj.betAmount,
    })
  }

  static toEncodable(fields: UserBetParamsFields) {
    return {
      gameType: fields.gameType,
      userGuess: fields.userGuess,
      betAmount: fields.betAmount,
    }
  }

  toJSON(): UserBetParamsJSON {
    return {
      gameType: this.gameType,
      userGuess: this.userGuess,
      betAmount: this.betAmount.toString(),
    }
  }

  static fromJSON(obj: UserBetParamsJSON): UserBetParams {
    return new UserBetParams({
      gameType: obj.gameType,
      userGuess: obj.userGuess,
      betAmount: new BN(obj.betAmount),
    })
  }

  toEncodable() {
    return UserBetParams.toEncodable(this)
  }
}

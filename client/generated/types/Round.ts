import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh"

export interface RoundFields {
  roundId: BN
  status: types.RoundStatusKind
  betAmount: BN
  gameType: types.GameTypeKind
  gameConfig: types.GameConfigFields
  guess: number
  result: number
  requestSlot: BN
  requestTimestamp: BN
  settleSlot: BN
  settleTimestamp: BN
}

export interface RoundJSON {
  roundId: string
  status: types.RoundStatusJSON
  betAmount: string
  gameType: types.GameTypeJSON
  gameConfig: types.GameConfigJSON
  guess: number
  result: number
  requestSlot: string
  requestTimestamp: string
  settleSlot: string
  settleTimestamp: string
}

export class Round {
  readonly roundId: BN
  readonly status: types.RoundStatusKind
  readonly betAmount: BN
  readonly gameType: types.GameTypeKind
  readonly gameConfig: types.GameConfig
  readonly guess: number
  readonly result: number
  readonly requestSlot: BN
  readonly requestTimestamp: BN
  readonly settleSlot: BN
  readonly settleTimestamp: BN

  constructor(fields: RoundFields) {
    this.roundId = fields.roundId
    this.status = fields.status
    this.betAmount = fields.betAmount
    this.gameType = fields.gameType
    this.gameConfig = new types.GameConfig({ ...fields.gameConfig })
    this.guess = fields.guess
    this.result = fields.result
    this.requestSlot = fields.requestSlot
    this.requestTimestamp = fields.requestTimestamp
    this.settleSlot = fields.settleSlot
    this.settleTimestamp = fields.settleTimestamp
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u128("roundId"),
        types.RoundStatus.layout("status"),
        borsh.u64("betAmount"),
        types.GameType.layout("gameType"),
        types.GameConfig.layout("gameConfig"),
        borsh.u32("guess"),
        borsh.u32("result"),
        borsh.u64("requestSlot"),
        borsh.i64("requestTimestamp"),
        borsh.u64("settleSlot"),
        borsh.i64("settleTimestamp"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Round({
      roundId: obj.roundId,
      status: types.RoundStatus.fromDecoded(obj.status),
      betAmount: obj.betAmount,
      gameType: types.GameType.fromDecoded(obj.gameType),
      gameConfig: types.GameConfig.fromDecoded(obj.gameConfig),
      guess: obj.guess,
      result: obj.result,
      requestSlot: obj.requestSlot,
      requestTimestamp: obj.requestTimestamp,
      settleSlot: obj.settleSlot,
      settleTimestamp: obj.settleTimestamp,
    })
  }

  static toEncodable(fields: RoundFields) {
    return {
      roundId: fields.roundId,
      status: fields.status.toEncodable(),
      betAmount: fields.betAmount,
      gameType: fields.gameType.toEncodable(),
      gameConfig: types.GameConfig.toEncodable(fields.gameConfig),
      guess: fields.guess,
      result: fields.result,
      requestSlot: fields.requestSlot,
      requestTimestamp: fields.requestTimestamp,
      settleSlot: fields.settleSlot,
      settleTimestamp: fields.settleTimestamp,
    }
  }

  toJSON(): RoundJSON {
    return {
      roundId: this.roundId.toString(),
      status: this.status.toJSON(),
      betAmount: this.betAmount.toString(),
      gameType: this.gameType.toJSON(),
      gameConfig: this.gameConfig.toJSON(),
      guess: this.guess,
      result: this.result,
      requestSlot: this.requestSlot.toString(),
      requestTimestamp: this.requestTimestamp.toString(),
      settleSlot: this.settleSlot.toString(),
      settleTimestamp: this.settleTimestamp.toString(),
    }
  }

  static fromJSON(obj: RoundJSON): Round {
    return new Round({
      roundId: new BN(obj.roundId),
      status: types.RoundStatus.fromJSON(obj.status),
      betAmount: new BN(obj.betAmount),
      gameType: types.GameType.fromJSON(obj.gameType),
      gameConfig: types.GameConfig.fromJSON(obj.gameConfig),
      guess: obj.guess,
      result: obj.result,
      requestSlot: new BN(obj.requestSlot),
      requestTimestamp: new BN(obj.requestTimestamp),
      settleSlot: new BN(obj.settleSlot),
      settleTimestamp: new BN(obj.settleTimestamp),
    })
  }

  toEncodable() {
    return Round.toEncodable(this)
  }
}

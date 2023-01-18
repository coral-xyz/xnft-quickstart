import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh"

export interface HistoryFields {
  idx: number
  max: number
  rounds: Array<types.RoundFields>
}

export interface HistoryJSON {
  idx: number
  max: number
  rounds: Array<types.RoundJSON>
}

export class History {
  readonly idx: number
  readonly max: number
  readonly rounds: Array<types.Round>

  constructor(fields: HistoryFields) {
    this.idx = fields.idx
    this.max = fields.max
    this.rounds = fields.rounds.map((item) => new types.Round({ ...item }))
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u32("idx"),
        borsh.u32("max"),
        borsh.array(types.Round.layout(), 48, "rounds"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new History({
      idx: obj.idx,
      max: obj.max,
      rounds: obj.rounds.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.Round.fromDecoded(item)
      ),
    })
  }

  static toEncodable(fields: HistoryFields) {
    return {
      idx: fields.idx,
      max: fields.max,
      rounds: fields.rounds.map((item) => types.Round.toEncodable(item)),
    }
  }

  toJSON(): HistoryJSON {
    return {
      idx: this.idx,
      max: this.max,
      rounds: this.rounds.map((item) => item.toJSON()),
    }
  }

  static fromJSON(obj: HistoryJSON): History {
    return new History({
      idx: obj.idx,
      max: obj.max,
      rounds: obj.rounds.map((item) => types.Round.fromJSON(item)),
    })
  }

  toEncodable() {
    return History.toEncodable(this)
  }
}

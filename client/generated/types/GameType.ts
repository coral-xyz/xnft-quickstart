import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh"

export interface NoneJSON {
  kind: "None"
}

export class None {
  static readonly discriminator = 0
  static readonly kind = "None"
  readonly discriminator = 0
  readonly kind = "None"

  toJSON(): NoneJSON {
    return {
      kind: "None",
    }
  }

  toEncodable() {
    return {
      None: {},
    }
  }
}

export interface CoinFlipJSON {
  kind: "CoinFlip"
}

export class CoinFlip {
  static readonly discriminator = 1
  static readonly kind = "CoinFlip"
  readonly discriminator = 1
  readonly kind = "CoinFlip"

  toJSON(): CoinFlipJSON {
    return {
      kind: "CoinFlip",
    }
  }

  toEncodable() {
    return {
      CoinFlip: {},
    }
  }
}

export interface SixSidedDiceRollJSON {
  kind: "SixSidedDiceRoll"
}

export class SixSidedDiceRoll {
  static readonly discriminator = 2
  static readonly kind = "SixSidedDiceRoll"
  readonly discriminator = 2
  readonly kind = "SixSidedDiceRoll"

  toJSON(): SixSidedDiceRollJSON {
    return {
      kind: "SixSidedDiceRoll",
    }
  }

  toEncodable() {
    return {
      SixSidedDiceRoll: {},
    }
  }
}

export interface TwentySidedDiceRollJSON {
  kind: "TwentySidedDiceRoll"
}

export class TwentySidedDiceRoll {
  static readonly discriminator = 3
  static readonly kind = "TwentySidedDiceRoll"
  readonly discriminator = 3
  readonly kind = "TwentySidedDiceRoll"

  toJSON(): TwentySidedDiceRollJSON {
    return {
      kind: "TwentySidedDiceRoll",
    }
  }

  toEncodable() {
    return {
      TwentySidedDiceRoll: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.GameTypeKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("None" in obj) {
    return new None()
  }
  if ("CoinFlip" in obj) {
    return new CoinFlip()
  }
  if ("SixSidedDiceRoll" in obj) {
    return new SixSidedDiceRoll()
  }
  if ("TwentySidedDiceRoll" in obj) {
    return new TwentySidedDiceRoll()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.GameTypeJSON): types.GameTypeKind {
  switch (obj.kind) {
    case "None": {
      return new None()
    }
    case "CoinFlip": {
      return new CoinFlip()
    }
    case "SixSidedDiceRoll": {
      return new SixSidedDiceRoll()
    }
    case "TwentySidedDiceRoll": {
      return new TwentySidedDiceRoll()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "None"),
    borsh.struct([], "CoinFlip"),
    borsh.struct([], "SixSidedDiceRoll"),
    borsh.struct([], "TwentySidedDiceRoll"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}

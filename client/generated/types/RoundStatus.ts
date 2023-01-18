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

export interface AwaitingJSON {
  kind: "Awaiting"
}

export class Awaiting {
  static readonly discriminator = 1
  static readonly kind = "Awaiting"
  readonly discriminator = 1
  readonly kind = "Awaiting"

  toJSON(): AwaitingJSON {
    return {
      kind: "Awaiting",
    }
  }

  toEncodable() {
    return {
      Awaiting: {},
    }
  }
}

export interface SettledJSON {
  kind: "Settled"
}

export class Settled {
  static readonly discriminator = 2
  static readonly kind = "Settled"
  readonly discriminator = 2
  readonly kind = "Settled"

  toJSON(): SettledJSON {
    return {
      kind: "Settled",
    }
  }

  toEncodable() {
    return {
      Settled: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): types.RoundStatusKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("None" in obj) {
    return new None()
  }
  if ("Awaiting" in obj) {
    return new Awaiting()
  }
  if ("Settled" in obj) {
    return new Settled()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.RoundStatusJSON): types.RoundStatusKind {
  switch (obj.kind) {
    case "None": {
      return new None()
    }
    case "Awaiting": {
      return new Awaiting()
    }
    case "Settled": {
      return new Settled()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "None"),
    borsh.struct([], "Awaiting"),
    borsh.struct([], "Settled"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}

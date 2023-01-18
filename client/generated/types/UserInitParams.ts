import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh"

export interface UserInitParamsFields {
  switchboardStateBump: number
  vrfPermissionBump: number
}

export interface UserInitParamsJSON {
  switchboardStateBump: number
  vrfPermissionBump: number
}

export class UserInitParams {
  readonly switchboardStateBump: number
  readonly vrfPermissionBump: number

  constructor(fields: UserInitParamsFields) {
    this.switchboardStateBump = fields.switchboardStateBump
    this.vrfPermissionBump = fields.vrfPermissionBump
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u8("switchboardStateBump"), borsh.u8("vrfPermissionBump")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UserInitParams({
      switchboardStateBump: obj.switchboardStateBump,
      vrfPermissionBump: obj.vrfPermissionBump,
    })
  }

  static toEncodable(fields: UserInitParamsFields) {
    return {
      switchboardStateBump: fields.switchboardStateBump,
      vrfPermissionBump: fields.vrfPermissionBump,
    }
  }

  toJSON(): UserInitParamsJSON {
    return {
      switchboardStateBump: this.switchboardStateBump,
      vrfPermissionBump: this.vrfPermissionBump,
    }
  }

  static fromJSON(obj: UserInitParamsJSON): UserInitParams {
    return new UserInitParams({
      switchboardStateBump: obj.switchboardStateBump,
      vrfPermissionBump: obj.vrfPermissionBump,
    })
  }

  toEncodable() {
    return UserInitParams.toEncodable(this)
  }
}

import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UserStateFields {
  bump: number
  authority: PublicKey
  house: PublicKey
  escrow: PublicKey
  rewardAddress: PublicKey
  vrf: PublicKey
  switchboardStateBump: number
  vrfPermissionBump: number
  currentRound: types.RoundFields
  lastAirdropRequestSlot: BN
  ebuf: Array<number>
  history: types.HistoryFields
}

export interface UserStateJSON {
  bump: number
  authority: string
  house: string
  escrow: string
  rewardAddress: string
  vrf: string
  switchboardStateBump: number
  vrfPermissionBump: number
  currentRound: types.RoundJSON
  lastAirdropRequestSlot: string
  ebuf: Array<number>
  history: types.HistoryJSON
}

export class UserState {
  readonly bump: number
  readonly authority: PublicKey
  readonly house: PublicKey
  readonly escrow: PublicKey
  readonly rewardAddress: PublicKey
  readonly vrf: PublicKey
  readonly switchboardStateBump: number
  readonly vrfPermissionBump: number
  readonly currentRound: types.Round
  readonly lastAirdropRequestSlot: BN
  readonly ebuf: Array<number>
  readonly history: types.History

  static readonly discriminator = Buffer.from([
    72, 177, 85, 249, 76, 167, 186, 126,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("bump"),
    borsh.publicKey("authority"),
    borsh.publicKey("house"),
    borsh.publicKey("escrow"),
    borsh.publicKey("rewardAddress"),
    borsh.publicKey("vrf"),
    borsh.u8("switchboardStateBump"),
    borsh.u8("vrfPermissionBump"),
    types.Round.layout("currentRound"),
    borsh.u64("lastAirdropRequestSlot"),
    borsh.array(borsh.u8(), 1024, "ebuf"),
    types.History.layout("history"),
  ])

  constructor(fields: UserStateFields) {
    this.bump = fields.bump
    this.authority = fields.authority
    this.house = fields.house
    this.escrow = fields.escrow
    this.rewardAddress = fields.rewardAddress
    this.vrf = fields.vrf
    this.switchboardStateBump = fields.switchboardStateBump
    this.vrfPermissionBump = fields.vrfPermissionBump
    this.currentRound = new types.Round({ ...fields.currentRound })
    this.lastAirdropRequestSlot = fields.lastAirdropRequestSlot
    this.ebuf = fields.ebuf
    this.history = new types.History({ ...fields.history })
  }

  static async fetch(
    c: Connection,
    address: PublicKey
  ): Promise<UserState | null> {
    const info = await c.getAccountInfo(address)

    if (info === null) {
      return null
    }
    if (!info.owner.equals(PROGRAM_ID)) {
      throw new Error("account doesn't belong to this program")
    }

    return this.decode(info.data)
  }

  static async fetchMultiple(
    c: Connection,
    addresses: PublicKey[]
  ): Promise<Array<UserState | null>> {
    const infos = await c.getMultipleAccountsInfo(addresses)

    return infos.map((info) => {
      if (info === null) {
        return null
      }
      if (!info.owner.equals(PROGRAM_ID)) {
        throw new Error("account doesn't belong to this program")
      }

      return this.decode(info.data)
    })
  }

  static decode(data: Buffer): UserState {
    if (!data.slice(0, 8).equals(UserState.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = UserState.layout.decode(data.slice(8))

    return new UserState({
      bump: dec.bump,
      authority: dec.authority,
      house: dec.house,
      escrow: dec.escrow,
      rewardAddress: dec.rewardAddress,
      vrf: dec.vrf,
      switchboardStateBump: dec.switchboardStateBump,
      vrfPermissionBump: dec.vrfPermissionBump,
      currentRound: types.Round.fromDecoded(dec.currentRound),
      lastAirdropRequestSlot: dec.lastAirdropRequestSlot,
      ebuf: dec.ebuf,
      history: types.History.fromDecoded(dec.history),
    })
  }

  toJSON(): UserStateJSON {
    return {
      bump: this.bump,
      authority: this.authority.toString(),
      house: this.house.toString(),
      escrow: this.escrow.toString(),
      rewardAddress: this.rewardAddress.toString(),
      vrf: this.vrf.toString(),
      switchboardStateBump: this.switchboardStateBump,
      vrfPermissionBump: this.vrfPermissionBump,
      currentRound: this.currentRound.toJSON(),
      lastAirdropRequestSlot: this.lastAirdropRequestSlot.toString(),
      ebuf: this.ebuf,
      history: this.history.toJSON(),
    }
  }

  static fromJSON(obj: UserStateJSON): UserState {
    return new UserState({
      bump: obj.bump,
      authority: new PublicKey(obj.authority),
      house: new PublicKey(obj.house),
      escrow: new PublicKey(obj.escrow),
      rewardAddress: new PublicKey(obj.rewardAddress),
      vrf: new PublicKey(obj.vrf),
      switchboardStateBump: obj.switchboardStateBump,
      vrfPermissionBump: obj.vrfPermissionBump,
      currentRound: types.Round.fromJSON(obj.currentRound),
      lastAirdropRequestSlot: new BN(obj.lastAirdropRequestSlot),
      ebuf: obj.ebuf,
      history: types.History.fromJSON(obj.history),
    })
  }
}

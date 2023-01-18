import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface HouseStateFields {
  bump: number
  authority: PublicKey
  mint: PublicKey
  houseVault: PublicKey
  switchboardQueue: PublicKey
  switchboardMint: PublicKey
  ebuf: Array<number>
}

export interface HouseStateJSON {
  bump: number
  authority: string
  mint: string
  houseVault: string
  switchboardQueue: string
  switchboardMint: string
  ebuf: Array<number>
}

export class HouseState {
  readonly bump: number
  readonly authority: PublicKey
  readonly mint: PublicKey
  readonly houseVault: PublicKey
  readonly switchboardQueue: PublicKey
  readonly switchboardMint: PublicKey
  readonly ebuf: Array<number>

  static readonly discriminator = Buffer.from([
    160, 248, 45, 36, 81, 236, 18, 77,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("bump"),
    borsh.publicKey("authority"),
    borsh.publicKey("mint"),
    borsh.publicKey("houseVault"),
    borsh.publicKey("switchboardQueue"),
    borsh.publicKey("switchboardMint"),
    borsh.array(borsh.u8(), 1024, "ebuf"),
  ])

  constructor(fields: HouseStateFields) {
    this.bump = fields.bump
    this.authority = fields.authority
    this.mint = fields.mint
    this.houseVault = fields.houseVault
    this.switchboardQueue = fields.switchboardQueue
    this.switchboardMint = fields.switchboardMint
    this.ebuf = fields.ebuf
  }

  static async fetch(
    c: Connection,
    address: PublicKey
  ): Promise<HouseState | null> {
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
  ): Promise<Array<HouseState | null>> {
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

  static decode(data: Buffer): HouseState {
    if (!data.slice(0, 8).equals(HouseState.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = HouseState.layout.decode(data.slice(8))

    return new HouseState({
      bump: dec.bump,
      authority: dec.authority,
      mint: dec.mint,
      houseVault: dec.houseVault,
      switchboardQueue: dec.switchboardQueue,
      switchboardMint: dec.switchboardMint,
      ebuf: dec.ebuf,
    })
  }

  toJSON(): HouseStateJSON {
    return {
      bump: this.bump,
      authority: this.authority.toString(),
      mint: this.mint.toString(),
      houseVault: this.houseVault.toString(),
      switchboardQueue: this.switchboardQueue.toString(),
      switchboardMint: this.switchboardMint.toString(),
      ebuf: this.ebuf,
    }
  }

  static fromJSON(obj: HouseStateJSON): HouseState {
    return new HouseState({
      bump: obj.bump,
      authority: new PublicKey(obj.authority),
      mint: new PublicKey(obj.mint),
      houseVault: new PublicKey(obj.houseVault),
      switchboardQueue: new PublicKey(obj.switchboardQueue),
      switchboardMint: new PublicKey(obj.switchboardMint),
      ebuf: obj.ebuf,
    })
  }
}

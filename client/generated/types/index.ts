import * as GameType from "./GameType"
import * as RoundStatus from "./RoundStatus"

export { HouseInitParams } from "./HouseInitParams"
export type {
  HouseInitParamsFields,
  HouseInitParamsJSON,
} from "./HouseInitParams"
export { UserAirdropParams } from "./UserAirdropParams"
export type {
  UserAirdropParamsFields,
  UserAirdropParamsJSON,
} from "./UserAirdropParams"
export { UserBetParams } from "./UserBetParams"
export type { UserBetParamsFields, UserBetParamsJSON } from "./UserBetParams"
export { UserInitParams } from "./UserInitParams"
export type { UserInitParamsFields, UserInitParamsJSON } from "./UserInitParams"
export { UserSettleParams } from "./UserSettleParams"
export type {
  UserSettleParamsFields,
  UserSettleParamsJSON,
} from "./UserSettleParams"
export { GameConfig } from "./GameConfig"
export type { GameConfigFields, GameConfigJSON } from "./GameConfig"
export { Round } from "./Round"
export type { RoundFields, RoundJSON } from "./Round"
export { History } from "./History"
export type { HistoryFields, HistoryJSON } from "./History"
export { GameType }

export type GameTypeKind =
  | GameType.None
  | GameType.CoinFlip
  | GameType.SixSidedDiceRoll
  | GameType.TwentySidedDiceRoll
export type GameTypeJSON =
  | GameType.NoneJSON
  | GameType.CoinFlipJSON
  | GameType.SixSidedDiceRollJSON
  | GameType.TwentySidedDiceRollJSON

export { RoundStatus }

export type RoundStatusKind =
  | RoundStatus.None
  | RoundStatus.Awaiting
  | RoundStatus.Settled
export type RoundStatusJSON =
  | RoundStatus.NoneJSON
  | RoundStatus.AwaitingJSON
  | RoundStatus.SettledJSON

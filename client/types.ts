import * as anchor from "@project-serum/anchor";
// import { SwitchboardVrfFlip } from "../target/types/switchboard_vrf_flip";
// export * from "../target/types/switchboard_vrf_flip";

export type FlipProgram = anchor.Program;
// | anchor.Program<SwitchboardVrfFlip>;

/**
 * An enum representing all known permission types for Switchboard.
 */
export enum GameTypeEnum {
  NONE = "none",
  COIN_FLIP = "coinFlip",
  SIX_SIDED_DICE_ROLL = "sixSidedDiceRoll",
  TWENTY_SIDED_DICE_ROLL = "twentySidedDiceRoll",
}
export enum GameTypeValue {
  NONE = 0,
  COIN_FLIP = 1,
  SIX_SIDED_DICE_ROLL = 2,
  TWENTY_SIDED_DICE_ROLL = 3,
}

export const convertGameType = (gameType: any): GameTypeEnum => {
  if ("kind" in gameType) {
    switch (gameType.kind) {
      case "None":
        return GameTypeEnum.NONE;
      case "CoinFlip":
        return GameTypeEnum.COIN_FLIP;
      case "SixSidedDiceRoll":
        return GameTypeEnum.SIX_SIDED_DICE_ROLL;
      case "TwentySidedDiceRoll":
        return GameTypeEnum.TWENTY_SIDED_DICE_ROLL;
    }
  }
  if ("none" in gameType) {
    return GameTypeEnum.NONE;
  }
  if ("coinFlip" in gameType) {
    return GameTypeEnum.COIN_FLIP;
  }
  if ("sixSidedDiceRoll" in gameType) {
    return GameTypeEnum.SIX_SIDED_DICE_ROLL;
  }
  if ("twentySidedDiceRoll" in gameType) {
    return GameTypeEnum.TWENTY_SIDED_DICE_ROLL;
  }

  console.log(gameType);
  console.log(typeof gameType);

  throw new Error(`Failed to match game type enum`);
};

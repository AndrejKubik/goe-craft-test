import { PlayerData } from "../data/player/PlayerData";

export class DataFactory {
  static createPlayerData(): PlayerData {
    return {
      playTimeSecondTicks: 0,
    };
  }
}

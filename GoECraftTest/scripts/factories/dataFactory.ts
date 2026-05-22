import { PlayerData } from "../data/PlayerData";

export class DataFactory {
  static createPlayerData(): PlayerData {
    return {
      playTimeSecondTicks: 0,
    };
  }
}

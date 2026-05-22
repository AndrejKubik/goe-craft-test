import { PlayerData } from "../data/playerData";

export class DataFactory {
  static createPlayerData(): PlayerData {
    return {
      playTimeSecondTicks: 0,
    };
  }
}

/**Helper for time conversions*/
export class TimeUtility {
  public static secondsToTicks(seconds: number): number {
    return seconds * 20;
  }

  public static ticksToSeconds(ticks: number): number {
    return Math.floor(ticks / 20);
  }
}

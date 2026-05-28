/**Helper for time conversions*/
export class TimeUtility {
    static secondsToTicks(seconds) {
        return seconds * 20;
    }
    static ticksToSeconds(ticks) {
        return Math.floor(ticks / 20);
    }
}
//# sourceMappingURL=TimeUtility.js.map
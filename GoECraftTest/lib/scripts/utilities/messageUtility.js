import { MessageTextFormat } from "../data/MessageTextFormat";
export class MessageUtility {
    static formatString(text, color, format = MessageTextFormat.Normal) {
        return `${format}${color}${text}§r`;
    }
    static formatStringTime(timeInSeconds, forceFullFormat = true) {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        let hoursText = forceFullFormat ? `${this.getPadStartNumberString(hours, 2)}` : hours.toString();
        let minutesText = forceFullFormat ? `${this.getPadStartNumberString(minutes, 2)}` : minutes.toString();
        let secondsText = forceFullFormat ? `${this.getPadStartNumberString(seconds, 2)}` : seconds.toString();
        return `${hoursText}:${minutesText}:${secondsText}`;
    }
    static getPadStartNumberString(number, minSymbols) {
        if (minSymbols < 2) {
            console.warn("Use [number.toString()] instead of  for minSymbols < 2");
            return number.toString();
        }
        return `${number.toString().padStart(minSymbols, "0")}`;
    }
}
//# sourceMappingURL=MessageUtility.js.map
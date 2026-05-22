import { MessageTextColor } from "../data/messageTextColor";
import { MessageTextFormat } from "../data/messageTextFormat";

export class MessageUtility {
  static formatString(
    text: string,
    color: MessageTextColor,
    format: MessageTextFormat = MessageTextFormat.Normal
  ): string {
    return `${format}${color}${text}§r`;
  }

  static formatStringTime(timeInSeconds: number, forceFullFormat: boolean = true): string {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    let hoursText = forceFullFormat ? `${this.getPadStartNumberString(hours, 2)}` : hours.toString();
    let minutesText = forceFullFormat ? `${this.getPadStartNumberString(minutes, 2)}` : minutes.toString();
    let secondsText = forceFullFormat ? `${this.getPadStartNumberString(seconds, 2)}` : seconds.toString();

    return `${hoursText}:${minutesText}:${secondsText}`;
  }

  static getPadStartNumberString(number: number, minSymbols: number) {
    if (minSymbols < 2) {
      console.warn("Use [number.toString()] instead of  for minSymbols < 2");

      return number.toString();
    }

    return `${number.toString().padStart(minSymbols, "0")}`;
  }
}

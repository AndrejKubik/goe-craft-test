import { MessageTextColor } from "../data/MessageTextColor";
import { MessageTextFormat } from "../data/MessageTextFormat";

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

  static getCounterNumberString(value: number): string {
    const mod10 = value % 10; //right-most first number
    const mod100 = value % 100; //right-most first two numbers

    if (mod100 >= 11 && mod100 <= 13) {
      return `${value}th`;
    }

    switch (mod10) {
      case 1:
        return `${value}st`;

      case 2:
        return `${value}nd`;

      case 3:
        return `${value}rd`;

      default:
        return `${value}th`;
    }
  }
}

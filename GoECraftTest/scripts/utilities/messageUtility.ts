import { MessageTextColor } from "../data/messageTextColor";
import { MessageTextFormat } from "../data/messageTextFormat";

export class MessageUtility {
  static getFormattedString(
    text: string,
    color: MessageTextColor,
    format: MessageTextFormat = MessageTextFormat.Normal
  ): string {
    return `${format}${color}${text}§r`;
  }
}

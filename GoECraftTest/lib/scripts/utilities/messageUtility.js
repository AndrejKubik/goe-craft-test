import { MessageTextFormat } from "../data/messageTextFormat";
export class MessageUtility {
    static getFormattedString(text, color, format = MessageTextFormat.Normal) {
        return `${format}${color}${text}§r`;
    }
}
//# sourceMappingURL=messageUtility.js.map
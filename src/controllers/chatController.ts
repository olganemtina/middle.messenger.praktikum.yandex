import Chat from "../models/chat/chat";
import { getChats } from "../services/chats";

export default class ChatContoler {
  getAll(): Array<Chat> {
    return getChats();
  }

  getById(id: number): Chat | null {
    return getChats().find((item) => item.id == id) || null;
  }
}

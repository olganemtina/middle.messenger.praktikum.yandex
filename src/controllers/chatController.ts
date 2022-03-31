import Chat from '../models/chat/chat';
import { getChats } from '../services/chats';
import { State } from '../utils/enums';

export default class ChatContoler {
  getAll() : Array<Chat> {
    let chats = getChats();
    return chats;
  }

  getById(id : number) : Chat | null {
    let chat = getChats()
      .find((item) => item.id == id) || null;
    return chat;
  }
}

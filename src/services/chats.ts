import Chat from '../models/chat/chat';
import chats from '../../data/chat.json';
import { State } from '../utils/enums';

export const getChats = () => {
  let data = (chats as Array<Chat>).map((x : Chat) => {
    x.image = `/${x.id}.png`;
    x.status = x.status == 0 ? State.Online : State.Offline;
    return x;
  });
  return data;
};

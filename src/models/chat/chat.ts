import { State } from '../../utils/enums';
import Message from './message';

export default class Chat {
  id: number;

  name: string;

  messages: Array<Message>;

  newMessagesCount: number;

  image: any;

  status: State | null;
}

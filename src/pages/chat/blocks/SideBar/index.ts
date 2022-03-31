import Block from '../../../../utils/block';
import Card from '../Card/index';
import Avatar from '../../../../components/avatar/index';
import Badge from '../../../../components/badge/index';
import Anchor from '../../../../components/anchor/index';
import Input from '../../../../components/input/index';
import ImageButton from '../../../../components/imageButton/index';
import tmp from './index.hbs';
import ChatController from '../../../../controllers/chatController';
import UserController from '../../../../controllers/userController';
import Chat from '../../../../models/chat/chat';
import User from '../../../../models/user';
import userImage from '../../../../images/users/main.png';
import { setStatusCssClass } from '../../../../utils/helpers';
import { State } from '../../../../utils/enums';

interface SideBarProps {
  className?: string;
}

function getData(target: SideBar, propertyKey: string, descriptor: PropertyDescriptor) {
  target.chats = new ChatController().getAll();
  target.currentUser = new UserController().getCurrentUser() as User;
}

export default class SideBar extends Block {
  chats: Chat[];

  currentUser: User;

  constructor(props: SideBarProps) {
    super(props);
  }

  @getData
  protected initChildren(): void {
    this.children.avatar = new Avatar({
      src: '/main.png',
      alt: '',
      className: 'avatar avatar-small',
      statusClassName: setStatusCssClass(State.Online),
    });
    this.children.anchor = new Anchor({
      href: '/profile/index.html',
      className: 'link2',
      text: this.currentUser.first_name || '',
    });

    this.children.addChatBtn = new ImageButton({
      containerClassName: 'img-button-container',
      imgClassName: 'add-user-img',
    });

    this.children.searchInput = new Input({
      type: 'text',
      className: 'search-input',
      placeholder: 'Поиск',
      name: 'search',
      containerClassName: 'padding-15',
    });

    this.children.chats = new Array<Block>();

    this.chats.map((chat: Chat) => {
      let card = new Card({
        avatar: new Avatar({
          src: chat.image,
          alt: '',
          className: 'avatar avatar-small',
          statusClassName: setStatusCssClass(chat.status as State),
        }),
        name: chat.name,
        description: chat.messages[0].text,
        className: 'chat-item',
        badge: chat.newMessagesCount > 0 ? new Badge({ count: chat.newMessagesCount?.toString(), className: 'badge' }) : null,
        date: chat.messages[0].date?.toString(),
      });
      (this.children.chats as Array<Block>).push(card);
    });
  }
  render(): DocumentFragment {
    return this.compile(tmp, { ...this.props });
  }
}

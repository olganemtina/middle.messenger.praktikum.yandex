import Badge from '../../components/badge/index';
import Card from './blocks/Card/index';
import Avatar from '../../components/avatar/index';
import Input from '../../components/input/index';
import Anchor from '../../components/anchor/index';
import ImageButton from '../../components/imageButton/index';
import MessageItem from '../../components/message/index';
import Block from '../../utils/block';
import tmpl from './chat.hbs';
import SideBar from './blocks/SideBar';
import MessagePanel from './blocks/MessagePanel';

export default class ChatPage extends Block {
  constructor() {
    super();
    // to do
  }

  protected initChildren(): void {
    this.children.sideBar = new SideBar({ });
    this.children.messagePanel = new MessagePanel({ });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {});
  }
}

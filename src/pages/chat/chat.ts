import Block from "../../utils/block";
import MessagePanel from "./blocks/MessagePanel";
import SideBar from "./blocks/SideBar";
import tmpl from "./chat.hbs";

export default class ChatPage extends Block {
  protected initChildren(): void {
    this.children.sideBar = new SideBar({});
    this.children.messagePanel = new MessagePanel({});
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {});
  }
}

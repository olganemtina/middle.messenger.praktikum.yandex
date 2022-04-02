import Block from "../../../../utils/block";
import Card from "../Card/index";
import Avatar from "../../../../components/avatar/index";
import MessageItem from "../../../../components/message/index";
import Input from "../../../../components/input/index";
import ImageButton from "../../../../components/imageButton/index";
import userImage1 from "../../../../images/users/1.png";
import ChatController from "../../../../controllers/chatController";
import tmp from "./index.hbs";
import Chat from "../../../../models/chat/chat";
import { setStatusCssClass } from "../../../../utils/helpers";
import { State } from "../../../../utils/enums";

interface MessagePanelProps {
  className?: string;
}

function getData(
  target: MessagePanel,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  target.currentChat = new ChatController().getById(1) as Chat;
}

export default class MessagePanel extends Block {
  currentChat: Chat;

  constructor(props: MessagePanelProps) {
    super(props);
  }

  @getData
  protected initChildren(): void {
    this.children.card = new Card({
      avatar: new Avatar({
        src: userImage1,
        alt: "",
        className: "avatar avatar-small",
        statusClassName: setStatusCssClass(this.currentChat.status as State),
      }),
      name: this.currentChat?.name || "",
      description:
        this.currentChat?.status == State.Online ? "онлайн" : "офлайн",
      className: "chat-item width-90-percent",
    });

    this.children.settings = new ImageButton({
      containerClassName:
        "position-absolute top-35-percent right-15-px settings-button-container cursor-pointer",
      imgClassName: "more-img cursor-pointer",
    });

    this.children.messages = new Array<MessageItem>();
    this.currentChat?.messages.map((message) => {
      (this.children.messages as Array<MessageItem>).push(
        new MessageItem({
          className: message.incoming ? "message-incoming" : "message-outgoing",
          text: message.text,
          date: message.date,
          read: message.read,
        })
      );
    });

    this.children.attachFileBtn = new ImageButton({
      containerClassName: "attach-button-container cursor-pointer",
      imgClassName: "attach-img cursor-pointer",
    });

    this.children.messageInput = new Input({
      type: "text",
      className: "message-input width-100-percent margin-bottom-20",
      placeholder: "Текст сообщения",
      name: "message",
      containerClassName: "padding-left-15 padding-right-15 padding-top-15",
      validatePattern: /(?!^$)([^\s])/,
      validationErrorText: "Поле не может быть пустым",
    });

    this.children.sendBtn = new ImageButton({
      containerClassName: "send-button-container cursor-pointer",
      imgClassName: "send-img cursor-pointer",
      events: {
        click: (evt: Event) => {
          let data = {
            messageText: ((this.children.messageInput as Block).props as any)
              .value,
          };
          this.validateAllFields();
          evt.preventDefault();
          evt.stopPropagation();
          console.log(data);
        },
      },
    });
  }

  validateAllFields() {
    Object.entries(this.children)
      .filter(([key, child]) => child instanceof Input)
      .forEach(([key, child]) => {
        (child as Input).validate();
      });
  }

  render(): DocumentFragment {
    return this.compile(tmp, { ...this.props });
  }
}

import Block from '../../utils/block';
import tmp from './index.hbs';

interface MessageProps {
	text: string;
	className: string;
	date: string;
	read: boolean;
}

export default class MessageItem extends Block {
  constructor(props: MessageProps) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(tmp, { ...this.props });
  }
}

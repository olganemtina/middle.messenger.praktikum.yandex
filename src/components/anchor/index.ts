import Block from '../../utils/block';
import tmp from './index.hbs';

interface AnchorProps {
	text: string;
    href: string;
    className: string;
}

export default class Anchor extends Block {
  constructor(props: AnchorProps) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(tmp, { ...this.props });
  }
}

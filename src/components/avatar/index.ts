import Block from '../../utils/block';
import tmp from './index.hbs';

interface AvatarProps {
	src: any;
	alt: string;
    className: string;
	statusClassName: string;
}

export default class Badge extends Block {
  constructor(props: AvatarProps) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(tmp, { ...this.props });
  }
}

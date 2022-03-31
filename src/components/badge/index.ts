import Block from '../../utils/block';
import tmp from './index.hbs';

interface BadgeProps {
	count: string;
	className: string
}

export default class Badge extends Block {
  constructor(props: BadgeProps) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(tmp, { ...this.props });
  }
}

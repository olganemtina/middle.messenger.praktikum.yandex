import Block from '../../../../utils/block';
import Badge from '../../../../components/badge';
import Avatar from '../../../../components/avatar';
import tmp from './index.hbs';

interface CardProps {
	name: string;
	description: string | null;
	className: string;
	badge?: Badge | null;
	avatar: Avatar;
	date?: string;
	status?: string | null;
}

export default class Card extends Block {
  constructor(props: CardProps) {
    super(props);
  }

  protected initChildren(): void {
    // to do
  }

  render(): DocumentFragment {
    return this.compile(tmp, { ...this.props });
  }
}

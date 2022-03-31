import Block from '../../utils/block';
import render from '../../utils/renderDOM';
import tmp from './index.hbs';

interface ImageButtonProps {
	containerClassName: string;
    imgClassName: string;
	events?:{
		click: (evt : Event)=>void
	}
}

export default class ImageButton extends Block {
  constructor(props: ImageButtonProps) {
    super(props);
  }

  renderDom() {
    let container = (document.getElementById(this.element.id) as HTMLElement);
    if (container) {
      let root = container.parentElement as HTMLElement;
      render(root, this);
    }
  }

  render(): DocumentFragment {
    return this.compile(tmp, { ...this.props });
  }
}

import Block from '../../utils/block';
import tmp from './index.hbs';
import render from '../../utils/renderDOM';

interface InputProps {
	type: string;
	className: string;
	containerClassName?: string;
	placeholder: string;
	validatePattern?: RegExp;
	validationErrorText?: string,
	name: string;
	value?: string;
	errorText?: string;
	errorVisibility?: string;
	events?: {
		change?: () => void;
		focus?: (e: Event) => void;
		blur?: () => void;

	};
}

export default class Input extends Block {
  constructor(props: InputProps) {
    props.events = {
      blur: () => {
        this.setValue();
        this.validate();
      },
      focus: () => {
        this.setFocus();
      },
    };
    super(props);
  }

  renderDom() {
    let container = (document.getElementById(this.element.id) as HTMLElement);
    if (container) {
      let root = container.parentElement as HTMLElement;
      render(root, this);
    }
  }

  setValue() {
    (this.props as InputProps).value = (this.element.firstElementChild as any).value;
  }

  setFocus() {
    (this.element.querySelector('input') as HTMLInputElement).classList.remove('error');
    let errorTextDiv = this.element.querySelector('.error-message-container div') as HTMLElement;
    errorTextDiv.textContent = '';
  }

  validate(): boolean {
    let props = this.props as InputProps;
    let { classList } = this.element.firstElementChild as Element;
    if ((props.value || '').match(props.validatePattern as RegExp)) {
      classList.remove('error');
      props.className = Array.from(classList).join(' ');
      props.errorText = '';
      props.errorVisibility = 'hide';
      return true;
    }

    classList.add('error');
    props.className = Array.from(classList).join(' ');
    props.errorText = props.validationErrorText;
    props.errorVisibility = 'show';
    return false;
  }

  render(): DocumentFragment {
    return this.compile(tmp, { ...this.props });
  }
}

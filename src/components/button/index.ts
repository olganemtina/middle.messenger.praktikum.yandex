import Block from "../../utils/block";
import tmp from "./index.hbs";

interface ButtonProps {
  text: string;
  className: string;
  events?: {
    click?: (evt: Event) => void;
  };
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(tmp, { ...this.props });
  }
}

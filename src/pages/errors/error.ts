import Block from "../../utils/block";
import tmp from "./error.hbs";

export default class ErrorPage extends Block {
  constructor(props: any) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(tmp, this.props);
  }
}

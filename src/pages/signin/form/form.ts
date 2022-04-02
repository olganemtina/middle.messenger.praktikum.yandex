import Block from "../../../utils/block";
import Button from "../../../components/button";
import Input from "../../../components/input";
import tmp from "./form.hbs";

export default class SignInForm extends Block {
  constructor() {
    let props = {
      events: {
        submit: (evt: Event) => {
          this.submit(evt);
        },
      },
    };
    super(props);
  }

  initChildren(): void {
    this.children.inputLogin = new Input({
      type: "text",
      className: "auth-input",
      placeholder: "Логин",
      name: "name",
      validatePattern: /^[a-zA-Z][a-zA-Z0-9-_\\.]{2,20}$/,
      validationErrorText:
        "Длина логина: от 3 до 20 символов, латиница, может содержать цифры, дефис и нижнее подчеркивание, но не может содержать спецсимволы",
    });

    this.children.inputPassword = new Input({
      type: "password",
      className: "auth-input",
      placeholder: "Пароль",
      name: "password",
      validatePattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{7,40}$/,
      validationErrorText:
        "Длина пароля: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
    });

    this.children.button = new Button({
      text: "Войти",
      className: "button cursor-pointer",
    });
  }

  validateAllFields() {
    Object.entries(this.children)
      .filter(([key, child]) => child instanceof Input)
      .forEach(([key, child]) => {
        (child as Input).validate();
      });
  }

  submit(evt: Event) {
    let data = {
      login: ((this.children.inputLogin as Block).props as any).value,
      password: ((this.children.inputPassword as Block).props as any).value,
    };
    this.validateAllFields();
    evt.preventDefault();
    console.log(data);
  }

  render(): DocumentFragment {
    {
      return this.compile(tmp, {});
    }
  }
}

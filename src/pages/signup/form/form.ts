import Block from "../../../utils/block";
import tmp from "./form.hbs";
import Input from "../../../components/input/index";
import Button from "../../../components/button/index";

export default class SignUpForm extends Block {
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
    this.children.inputName = new Input({
      type: "text",
      className: "auth-input",
      placeholder: "Имя",
      name: "first_name",
      validatePattern: /^([A-ZА-Я][a-zа-я_]{2,20})/,
      validationErrorText:
        "Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов",
    });

    this.children.inputSecondName = new Input({
      type: "text",
      className: "auth-input",
      placeholder: "Фамилия",
      name: "second_name",
      validatePattern: /^([A-ZА-Я][a-zа-я_]{3,20})/,
      validationErrorText:
        "Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов",
    });

    this.children.inputPhone = new Input({
      type: "text",
      className: "auth-input",
      placeholder: "Телефон",
      name: "phone",
      validatePattern: /^((\+7|7|8)+([0-9]){10,15})$/,
      validationErrorText:
        "от 10 до 15 символов, состоит из цифр, может начинается с плюса",
    });

    this.children.inputLogin = new Input({
      type: "text",
      className: "auth-input",
      placeholder: "Логин",
      name: "login",
      validatePattern: /^[a-zA-Z][a-zA-Z0-9-_\\.]{2,20}$/,
      validationErrorText:
        "Длина логина: от 3 до 20 символов, латиница, может содержать цифры, дефис и нижнее подчеркивание, но не может содержать спецсимволы",
    });

    this.children.inputEmail = new Input({
      type: "text",
      className: "auth-input",
      placeholder: "Email",
      name: "email",
      validatePattern:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      validationErrorText:
        "Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы",
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

    this.children.inputPassword2 = new Input({
      type: "password",
      className: "auth-input",
      placeholder: "Пароль (еще раз)",
      name: "password2",
      validatePattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{7,40}$/,
      validationErrorText:
        "Длина пароля: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
    });

    this.children.button = new Button({
      text: "Войти",
      className: "button cursor-pointer",
    });
  }

  submit(evt: Event) {
    let data = {
      name: ((this.children.inputName as Block).props as any).value,
      secondName: ((this.children.inputSecondName as Block).props as any).value,
      phone: ((this.children.inputPhone as Block).props as any).value,
      login: ((this.children.inputLogin as Block).props as any).value,
      email: ((this.children.inputEmail as Block).props as any).value,
      password: ((this.children.inputPassword as Block).props as any).value,
      password2: ((this.children.inputPassword2 as Block).props as any).value,
    };
    this.validateAllFields();
    evt.preventDefault();
    console.log(data);
  }

  validateAllFields() {
    Object.entries(this.children)
      .filter(([key, child]) => child instanceof Input)
      .forEach(([key, child]) => {
        (child as Input).validate();
      });
  }

  render(): DocumentFragment {
    return this.compile(tmp, {});
  }
}

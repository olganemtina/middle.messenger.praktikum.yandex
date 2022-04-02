import Block from "../../../utils/block";
import tmp from "./editProfile.hbs";
import Input from "../../../components/input/index";
import Button from "../../../components/button/index";
import UserContoler from "../../../controllers/userController";
import User from "../../../models/user";

function getData(
  target: SignUpForm,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  target.currentUser = new UserContoler().getCurrentUser() as User;
}

export default class SignUpForm extends Block {
  currentUser: User;

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

  @getData
  initChildren(): void {
    this.children.inputName = new Input({
      type: "text",
      className: "auth-input",
      placeholder: "Имя",
      name: "first_name",
      value: this.currentUser.first_name,
      validatePattern: /^([A-ZА-Я][a-zа-я_]{2,20})/,
      validationErrorText:
        "Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов",
    });

    this.children.inputSecondName = new Input({
      type: "text",
      className: "auth-input",
      placeholder: "Фамилия",
      name: "second_name",
      value: this.currentUser.second_name,
      validatePattern: /^([A-ZА-Я][a-zа-я_]{3,20})/,
      validationErrorText:
        "Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов",
    });

    this.children.inputPhone = new Input({
      type: "text",
      className: "auth-input",
      placeholder: "Телефон",
      name: "phone",
      value: this.currentUser.phone,
      validatePattern: /^((\+7|7|8)+([0-9]){10,15})$/,
      validationErrorText:
        "от 10 до 15 символов, состоит из цифр, может начинается с плюса",
    });

    this.children.inputLogin = new Input({
      type: "text",
      className: "auth-input",
      placeholder: "Логин",
      name: "login",
      value: this.currentUser.login,
      validatePattern: /^[a-zA-Z][a-zA-Z0-9-_\\.]{2,20}$/,
      validationErrorText:
        "Длина логина: от 3 до 20 символов, латиница, может содержать цифры, дефис и нижнее подчеркивание, но не может содержать спецсимволы",
    });

    this.children.inputEmail = new Input({
      type: "text",
      className: "auth-input",
      placeholder: "Email",
      name: "email",
      value: this.currentUser.email,
      validatePattern:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      validationErrorText:
        "Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы",
    });

    this.children.inputDisplayName = new Input({
      type: "text",
      className: "auth-input",
      placeholder: "Имя в чате",
      name: "display_name",
      value: this.currentUser.display_name,
    });

    this.children.button = new Button({
      text: "Сохранить изменения",
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
      inputDisplayName: ((this.children.inputDisplayName as Block).props as any)
        .value,
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

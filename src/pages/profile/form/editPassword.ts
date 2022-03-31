import Button from '../../../components/button';
import Input from '../../../components/input';
import UserContoler from '../../../controllers/userController';
import User from '../../../models/user';
import Block from '../../../utils/block';
import tmp from './editPassword.hbs';

function getData(target: EditPasswordForm, propertyKey: string, descriptor: PropertyDescriptor) {
  target.currentUser = new UserContoler().getCurrentUser() as User;
}

export default class EditPasswordForm extends Block {
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
    this.children.inputOldPassword = new Input({
      type: 'password',
      className: 'auth-input',
      placeholder: 'Текущий пароль',
      name: 'old_password',
      value: this.currentUser.password,
      validatePattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{7,40}$/,
      validationErrorText: 'Длина пароля: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
    });

    this.children.inputNewPassword = new Input({
      type: 'password',
      className: 'auth-input',
      placeholder: 'Новый пароль',
      name: this.currentUser.newPassword,
      validatePattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{7,40}$/,
      validationErrorText: 'Длина пароля: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
    });

    this.children.inputPassword2 = new Input({
      type: 'password',
      className: 'auth-input',
      placeholder: 'Подтверждение',
      name: this.currentUser.newPassword2,
      validatePattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{7,40}$/,
      validationErrorText: 'Длина пароля: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
    });

    this.children.saveButton = new Button({
      text: 'Сохранить изменения',
      className: 'button cursor-pointer',
    });
  }

  submit(evt: Event) {
    let data = {
      oldPassword: ((this.children.inputOldPassword as Block).props as any).value,
      newPassword: ((this.children.inputNewPassword as Block).props as any).value,
      newPasswordConfirm: ((this.children.inputPassword2 as Block).props as any).value,
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
    {
      return this.compile(tmp, {});
    }
  }
}

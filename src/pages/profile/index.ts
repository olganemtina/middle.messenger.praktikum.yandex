import Handlebars from 'handlebars';

let context = {
  first_name: 'Ольга',
  second_name: 'Немтина',
  phone: '8-912-463-88-99',
  login: 'studio191',
  display_name: 'Ольга',
  email: 'studio191@yandex.ru',
  password: '12345',
  new_password: '***',
  new_password2: '***',
};

let source = document.getElementById('profile')?.innerHTML;
let template = Handlebars.compile(source);
let html = template(context);
(document.getElementById('profile') as HTMLElement).innerHTML = html;

import render from '../../../utils/renderDOM';
import ErrorPage from '../error';

document.addEventListener('DOMContentLoaded', () => {
  let form = new ErrorPage({
    errorCode: 404,
    errorText: 'Страница не найдена.',
  });
  let root = document.querySelector('.content-center-wrapper') as HTMLElement;
  render(root, form);
});
import render from '../../utils/renderDOM';
import SignInForm from './form/form';

document.addEventListener('DOMContentLoaded', () => {
  let form = new SignInForm();
  let root = document.querySelector('#frmContainer') as HTMLElement;
  render(root, form);
});

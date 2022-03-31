import render from '../../utils/renderDOM';
import SignUpForm from './form/form';

document.addEventListener('DOMContentLoaded', () => {
  let form = new SignUpForm();
  let root = document.querySelector('#frmContainer') as HTMLElement;
  render(root, form);
});

import render from '../../utils/renderDOM';
import Button from '../../components/button/index';
import Input from '../../components/input/index';
import EditPasswordForm from './form/editPassword';

document.addEventListener('DOMContentLoaded', () => {
  let form = new EditPasswordForm();
  let root = document.querySelector('#frmContainer') as HTMLElement;
  render(root, form);
});

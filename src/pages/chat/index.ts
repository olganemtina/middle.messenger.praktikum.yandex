import render from '../../utils/renderDOM';
import ChatPage from './chat';

document.addEventListener('DOMContentLoaded', () => {
  let page = new ChatPage();
  let root = document.querySelector('.width-100-percent') as HTMLElement;
  render(root, page);
});

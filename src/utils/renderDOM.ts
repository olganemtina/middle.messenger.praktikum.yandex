import Block from './block';

function renderDOM(root: HTMLElement, element: Block) {
  if (!root) {
    throw Error('Нет корневого элемента');
  }

  element.dispatchComponentDidMoun();
  root.innerHTML = '';
  let content = element.getContent() as HTMLElement;
  (root as HTMLElement).appendChild(content);
  return root;
}

export default renderDOM;

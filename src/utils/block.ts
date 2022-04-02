import { nanoid } from "nanoid";
import EventBus from "./eventBus";

interface Meta {
  props: object;
}

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };

  _element: HTMLElement;

  _meta: Meta;

  children: Record<string, Block | Array<Block>> = {};

  id = nanoid(6);

  props = {};

  eventBus;

  /** JSDoc
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(propsAndChildren = {}) {
    const eventBus = new EventBus();
    let { props, children } = this.getChildren(propsAndChildren);
    this.children = children;

    this._meta = {
      props,
    };
    props.id = this.id;

    this.props = this._makePropsProxy(props);
    this.initChildren();
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected initChildren() {
    // do nothing
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(oldProps?: object) {
    // do nothing
  }

  dispatchComponentDidMoun() {
    // do nothing
  }

  _componentDidUpdate(oldProps: object, newProps: object) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER, newProps);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: object, newProps: object) {
    return true;
  }

  setProps = (nextProps: object) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  getChildren(propsAndChildren: any) {
    let children: any = {};
    let props: any = {};
    Object.entries(propsAndChildren).map(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (
        Array.isArray(value) &&
        value.every((x) => x instanceof Block)
      ) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { props, children };
  }

  _render() {
    let block: DocumentFragment = this.render();
    let newElement = block.firstElementChild as HTMLElement;
    this._element = newElement;
    this._removeEvents();
    this._addEvents();
    this.renderDom();
  }

  protected renderDom() {
    // override
  }

  // Может переопределять пользователь, необязательно трогать
  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: object) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    let self = this;
    props = new Proxy(props, {
      get(target: object, prop: string) {
        return target[prop as keyof typeof target];
      },
      set(target: any, prop: string, value: string) {
        const oldProps = { ...target };
        target[prop as keyof typeof target] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty(target: object, prop: string) {
        if (target[prop as keyof typeof target]) {
          throw Error("нет доступа");
        }
        return true;
      },
    });

    return props;
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  compile(temlate: (context: any) => string, context: any) {
    let fragment = this._createDocumentElement(
      "template"
    ) as HTMLTemplateElement;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        context[key] = child.map(
          (x) => `<div data-id="id-${(x as Block).id}"></div>`
        );
        return;
      }
      context[key] = `<div data-id="id-${(child as Block).id}"></div>`;
    });

    let htmlString = temlate(context);

    fragment.innerHTML = htmlString;

    Object.entries(this.children).forEach(([key, child]) => {
      let stub: Element | null;
      if (Array.isArray(child)) {
        child.forEach((x) => {
          stub = fragment.content.querySelector(
            `[data-id="id-${(x as Block).id}"]`
          );
          if (!stub) {
            return;
          }
          stub.replaceWith(x.getContent());
        });
        return;
      }

      stub = fragment.content.querySelector(
        `[data-id="id-${(child as Block).id}"]`
      );

      if (!stub) {
        return;
      }
      stub.replaceWith(child.getContent());
    });

    return fragment.content;
  }

  _removeEvents() {
    let { events } = this.props as any;
    if (events) {
      Object.entries(events).forEach(([event, handler]) => {
        this._element.removeEventListener(event, handler as any);
      });
    }
  }

  _addEvents() {
    let { events } = this.props as any;
    if (events) {
      Object.entries(events).forEach(([event, handler]) => {
        this._element.addEventListener(event, handler as any, true);
      });
    }
  }

  show() {
    (this.element as HTMLElement).style.display = "block";
  }

  hide() {
    (this.element as HTMLElement).style.display = "none";
  }
}

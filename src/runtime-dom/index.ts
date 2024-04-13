/** @format */
import { createRenderer } from 'src/runtime-core';

function createElement(type: any) {
  return document.createElement(type);
}
function createTextNode(text: string) {
  return document.createTextNode(text);
}
function setElementText(el: any, text: string) {
  return (el.textContent = text);
}
function insert(el: string, container: any, anchor: any) {
  container.insertBefore(el, anchor);
}
function remove(el: any) {
  const parent = el.parentNode;
  if (parent) {
    parent.removeChild(el);
  }
}
const veiKey = Symbol('_vei');
function patchProps(el: any, key: any, prevValue: any, nextValue: any) {
  const isOn = (key: string) => /^on[A-Z]/.test(key);
  if (isOn(key)) {
    // 用一层wrapper包裹，方便后续patch时直接替换value 为新的事件处理函数，而不用重新绑定事件
    const invokers = el[veiKey] || (el[veiKey] = {});
    const existingInvoker = invokers[key];
    const event = key.slice(2).toLowerCase();
    if (nextValue && existingInvoker) {
      // patch
      existingInvoker.value = nextValue;
    } else {
      if (nextValue) {
        const invoker = (invokers[key] = (e: Event) => {
          (invoker as any).value(e);
        });
        (invoker as any).value = nextValue;
        el.addEventListener(event, invoker);
      } else if (existingInvoker) {
        el.removeEventListener(event, existingInvoker);
        invokers[key] = undefined;
      }
    }
  } else {
    if (nextValue === null || nextValue === undefined) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, nextValue);
    }
  }
}

export const renderer: any = createRenderer({
  createText: createTextNode,
  createElement,
  patchProps,
  insert,
  remove,
  setElementText,
});
export function createApp(...args: any[]) {
  return renderer.createApp(...args);
}
export * from '../runtime-core';

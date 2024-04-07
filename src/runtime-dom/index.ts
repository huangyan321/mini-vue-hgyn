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
function patchProps(el: any, key: any, prevValue: any, nextValue: any) {
  const isOn = (key: string) => /^on[A-Z]/.test(key);
  if (isOn(key)) {
    const event = key.slice(2).toLowerCase();
    el.addEventListener(event, nextValue);
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

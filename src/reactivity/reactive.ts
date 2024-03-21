/** @format */
import { mutableHandlers, readonlyHandlers } from './baseHandlers';
export function reactive(raw: any) {
  return new Proxy(raw, mutableHandlers);
}

export function readonly(raw: any) {
  return new Proxy(raw, readonlyHandlers);
}

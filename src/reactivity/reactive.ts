/** @format */
import {
  mutableHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from './baseHandlers';
import { ReactiveFlags } from '../enums';

export function reactive(raw: any) {
  return new Proxy(raw, mutableHandlers);
}

export function readonly(raw: any) {
  return new Proxy(raw, readonlyHandlers);
}
export function shallowReadonly(raw: any) {
  return new Proxy(raw, shallowReadonlyHandlers);
}
export function isReactive(value: any) {
  return !!value[ReactiveFlags.IS_REACTIVE];
}
export function isReadonly(value: any) {
  return !!value[ReactiveFlags.IS_READONLY];
}
export function isProxy(value: any) {
  return isReactive(value) || isReadonly(value);
}

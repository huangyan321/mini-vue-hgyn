/** @format */
import { reactive, readonly } from './reactive';
import { track, trigger } from './effect';
import { isObject, assign } from 'src/shared';
import { ReactiveFlags } from '../enums';
const get = createGetter();
const set = createSetter();

const readonlyGet = createGetter(true);
const readonlySet = createSetter(true);

const shallowReadonlyGet = createGetter(true, true);
function createGetter<T extends object>(isReadonly = false, isShallow = false) {
  return function get(target: T, key: string | symbol, receiver: any) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly;
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly;
    }
    const res = Reflect.get(target, key, receiver);

    if (isObject(res) && !isShallow) {
      return isReadonly ? readonly(res) : reactive(res);
    }
    // 依赖收集
    if (!isReadonly) {
      track(target, key);
    }
    return res;
  };
}
function createSetter<T extends object>(isReadonly = false) {
  return function set(
    target: T,
    key: string | symbol,
    value: any,
    receiver: any
  ) {
    // 触发更新
    if (!isReadonly) {
      const res = Reflect.set(target, key, value, receiver);
      trigger(target, key);
      return res;
    } else {
      console.warn('cannot set readonly object');
      return true;
    }
  };
} /** @format */

export const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
};
export const readonlyHandlers: ProxyHandler<object> = {
  get: readonlyGet,
  set: readonlySet,
};
export const shallowReadonlyHandlers: ProxyHandler<object> = assign(
  {},
  readonlyHandlers,
  {
    get: shallowReadonlyGet,
  }
);

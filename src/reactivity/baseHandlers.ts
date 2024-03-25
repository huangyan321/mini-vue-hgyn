/** @format */
import { track, trigger } from '.';
function createGetter<T extends object>(isReadonly = false) {
  return function get(target: T, key: string | symbol, receiver: any) {
    const res = Reflect.get(target, key, receiver);
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
  get: createGetter(),
  set: createSetter(),
};
export const readonlyHandlers: ProxyHandler<object> = {
  get: createGetter(true),
  set: createSetter(true),
};

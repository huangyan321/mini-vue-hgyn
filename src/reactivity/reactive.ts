/** @format */
import { track, trigger } from '.';
export function reactive<T extends object>(raw: T): T {
  return new Proxy(raw, {
    get(target, key, receiver) {
      // 依赖收集
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      // 触发更新
      const res = Reflect.set(target, key, value, receiver);
      trigger(target, key);
      return res;
    },
  });
}

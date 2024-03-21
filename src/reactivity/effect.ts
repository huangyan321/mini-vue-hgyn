/** @format */
/**
 * 用于存储当前的effect
 */
let activeEffect: any;
/**
 * effect类
 */
class ReactiveEffect {
  _fn: () => void;
  constructor(fn: () => void) {
    activeEffect = this;
    this._fn = fn;
  }

  run() {
    this._fn();
  }
}
/**
 * 依赖收集的map, 用于存储依赖关系
 */
const targetMap = new Map();
/**
 *  收集依赖
 * @param target  目标对象
 * @param key  目标对象的属性
 */
export function track(target: any, key: string | symbol) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);
}
/**
 * 触发更新
 * @param target  目标对象
 * @param key  目标对象的属性
 * @returns void
 */
export function trigger(target: any, key: string | symbol) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const deps = depsMap.get(key);
  if (deps) {
    deps.forEach((effect: any) => {
      effect.run();
    });
  }
}
/**
 * 创建一个effect
 * @param fn  依赖函数
 */
export function effect(fn: () => any) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
}

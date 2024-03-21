/** @format */
let activeEffect: any;
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

const targetMap = new Map();

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

export function effect(fn: () => void) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
}

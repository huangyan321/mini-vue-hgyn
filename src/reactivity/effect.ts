/** @format */
/**
 * 用于存储当前的effect
 */
let activeEffect: ReactiveEffect | undefined;

let shouldTrack = true;
/**
 * effect类
 */
export class ReactiveEffect {
  _fn: () => void;
  public scheduler: any;
  public deps: any[] = [];
  active: boolean = true;
  constructor(fn: () => void, scheduler?: any) {
    this._fn = fn;
    this.scheduler = scheduler;
  }

  run() {
    activeEffect = this;
    if (this.active) {
      return this._fn();
    }
    shouldTrack = true;
    const result = this._fn();
    shouldTrack = false;
    return result;
  }

  stop() {
    if (this.active) {
      cleanupEffect(this);
      this.active = false;
    }
  }
}

function cleanupEffect(effect: any) {
  if (activeEffect) {
    activeEffect.deps.forEach((dep: any) => {
      dep.delete(activeEffect);
    });
    activeEffect.deps.length = 0;
    activeEffect = void 0;
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
  if (!isTracking()) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  trackEffects(dep);
}
export function trackEffects(dep: Set<ReactiveEffect>) {
  if (dep.has(activeEffect!)) return;
  // 依赖收集，用于在触发更新的时候重新执行effect
  // 这里的dep是一个set，用于存储当前key关联的副作用(effect)
  dep.add(activeEffect!);
  // 反向收集，用于effect在stop的时候能够从相关的依赖(dep)中清除自己
  activeEffect!.deps.push(dep);
}
export function isTracking() {
  return shouldTrack && activeEffect !== undefined;
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
    triggerEffects(deps);
  }
}

export function triggerEffects(deps: Set<ReactiveEffect>) {
  deps.forEach((effect: any) => {
    if (effect.scheduler) {
      effect.scheduler(effect.run.bind(effect));
    } else {
      effect.run();
    }
  });
}
/**
 * 创建一个effect
 * @param fn  依赖函数
 */
export function effect(fn: () => any, options: { scheduler?: any } = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  _effect.run();
  const runner = _effect.run.bind(_effect);
  (runner as any).effect = _effect;
  return runner;
}

export function stop(runner: any) {
  runner.effect.stop();
}

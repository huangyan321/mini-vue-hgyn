/** @format */
import { ReactiveEffect } from '.';
class ComputedRefImpl {
  private _getter: () => void;
  private dirty = true;
  private _value: any;
  private _effect: ReactiveEffect;
  constructor(getter: () => void) {
    this._getter = getter;
    this._effect = new ReactiveEffect(getter, () => {
      if (!this.dirty) {
        this.dirty = true;
      }
    });
    // 依赖收集
  }
  get value() {
    if (this.dirty) {
      // 是脏的 要更新
      this.dirty = false;
      return (this._value = this._effect.run());
    }
    return this._value;
  }
}

export function computed(getter: () => void) {
  return new ComputedRefImpl(getter);
}

/** @format */
import {
  type ReactiveEffect,
  trackEffects,
  triggerEffects,
  isTracking,
  reactive,
} from '.';
import { hasChanged, isObject } from 'src/shared';
class RefImpl {
  private _value: any;
  public dep: Set<ReactiveEffect>;
  private _rawValue: any;
  constructor(value: any) {
    this._rawValue = value;
    this._value = convert(value);
    this.dep = new Set();
  }

  get value() {
    trackRefValue(this);
    const res = this._value;

    return res;
  }
  set value(newValue) {
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue;
      this._value = convert(newValue);
      triggerEffects(this.dep);
    }
  }
}
function convert(value: any) {
  return isObject(value) ? reactive(value) : value;
}
export function trackRefValue(ref: InstanceType<typeof RefImpl>) {
  if (isTracking()) {
    trackEffects(ref.dep);
  }
}
export function ref(value: any) {
  return new RefImpl(value);
}

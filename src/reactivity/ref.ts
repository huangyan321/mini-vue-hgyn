/** @format */
import {
  type ReactiveEffect,
  trackEffects,
  triggerEffects,
  isTracking,
  reactive,
} from '.';
import { hasChanged, isObject } from 'src/shared';
export enum RefFlags {
  IS_REF = '__v_isRef',
}
class RefImpl {
  private _value: any;
  public dep: Set<ReactiveEffect>;
  private _rawValue: any;
  private __v_isRef = true;
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
export function isRef(ref: any): ref is RefImpl {
  return !!ref[RefFlags.IS_REF];
}
export function unRef(ref: any) {
  return isRef(ref) ? ref.value : ref;
}
export function proxyRef(ref: any) {
  return new Proxy(ref, {
    get(target, key) {
      return unRef(Reflect.get(target, key));
    },
    set(target, key, value) {
      if (isRef(Reflect.get(target, key)) && !isRef(value)) {
        Reflect.get(target, key).value = value;
        return true;
      } else {
        return Reflect.set(target, key, value);
      }
    },
  });
}

/** @format */

import { getCurrentInstance } from './component';

export function provide(key: any, value: any) {
  const currentInstance = getCurrentInstance();
  if (currentInstance) {
    let { provides } = currentInstance;
    const parentProvides = currentInstance.parent?.provides;
    if (provides === parentProvides) {
      provides = currentInstance.provides = Object.create(
        parentProvides || null
      );
    }
    provides[key] = value;
  }
}

export function inject(key: any, defaultValue: any) {
  const currentInstance = getCurrentInstance();
  if (currentInstance) {
    const parentProvides = currentInstance.parent?.provides;
    return parentProvides[key] || typeof defaultValue === 'function'
      ? defaultValue()
      : defaultValue;
  }
}

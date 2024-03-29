/** @format */
import { hasOwn } from 'src/shared';
const publicPropertyMap: any = {
  $el: (i: any) => i.vnode.el,
  $slots: (i: any) => i.slots,
};
export const publicInstanceProxyHandlers = {
  get({ _: instance }: { _: any }, key: any) {
    const publicGetter = publicPropertyMap[key];
    if (publicGetter) return publicGetter(instance);

    const { setupState = {}, props = {} } = instance;

    if (hasOwn(setupState, key)) {
      return setupState[key];
    } else if (hasOwn(props, key)) {
      return props[key];
    }

    return instance[key];
  },
};

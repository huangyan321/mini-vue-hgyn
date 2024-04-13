/** @format */
import { hasOwn } from 'src/shared';
const publicPropertyMap: any = {
  $el: (i: any) => i.vnode.el,
  $slots: (i: any) => i.slots,
  $props: (i: any) => {
    console.log(i.props);
    return i.props;
  },
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
  set({ _: instance }: { _: any }, key: any, value: any) {
    const { setupState = {}, props = {} } = instance;

    if (hasOwn(setupState, key)) {
      setupState[key] = value;
    } else if (hasOwn(props, key)) {
      props[key] = value;
    } else {
      instance[key] = value;
    }

    return true;
  },
};

/** @format */
const publicPropertyMap: any = {
  $el: (i: any) => i.vnode.el,
};
export const publicInstanceProxyHandlers = {
  get({ _: instance }: { _: any }, key: any) {
    const publicGetter = publicPropertyMap[key];
    if (publicGetter) return publicGetter(instance);

    const { setupState = {} } = instance;
    if (key in setupState) {
      return setupState[key];
    }
    return instance[key];
  },
};

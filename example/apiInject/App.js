/** @format */
import {
  h,
  getCurrentInstance,
  provide,
  inject,
} from '../../lib/mini-vue.esm.js';

export const Provider = {
  name: 'Provider',
  render() {
    window.self = this;
    return h('div', { id: 'root' }, [h('p', {}, 'Provider'), h(Provider2, {})]);
  },

  setup() {
    provide('foo', 'fooVal');
    provide('bar', 'barVal');
    return {};
  },
};
export const Provider2 = {
  name: 'Provider2',
  render() {
    window.self = this;
    return h('div', { id: 'root' }, [
      h('p', {}, 'Provider2'),
      h('p', {}, this.foo),
      h(Consumer, {}),
    ]);
  },

  setup() {
    provide('foo', 'fooValtwo');
    const foo = inject('foo');
    console.log('🚀 ~ setup ~ foo:', foo);
    return { foo };
  },
};
export const Consumer = {
  name: 'Consumer',
  setup(props) {
    const foo = inject('foo', 'defaultFooVal');
    const bar = inject('bar', 'defaultBarVal');
    const noExit = inject('noExit', 'defaultNoExit');
    return { foo, bar, noExit };
  },
  render() {
    return h(
      'div',
      { id: 'foo' },
      `Consumer: - ${this.foo} - ${this.bar}-${this.noExit}`
    );
  },
};

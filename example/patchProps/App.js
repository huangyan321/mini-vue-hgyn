/** @format */

import { ref, h } from '../../lib/mini-vue.esm.js';
export const App = {
  setup() {
    const count = ref(0);

    const props = ref({
      foo: 'foo',
      bar: 'bar',
    });

    const onChangePropsDemo1 = () => {
      props.value.foo = 'new foo';
    };
    const onChangePropsDemo2 = () => {
      props.value.foo = undefined;
    };
    const onChangePropsDemo3 = () => {
      props.value = {
        foo: 'foo',
      };
    };
    return {
      count,
      props,
      onChangePropsDemo1,
      onChangePropsDemo2,
      onChangePropsDemo3,
    };
  },
  render() {
    return h('div', { id: 'app', ...this.props }, [
      h('button', { onClick: this.onChangePropsDemo1 }, '值改变 修改'),
      h('button', { onClick: this.onChangePropsDemo2 }, '值改变为undefined 删除'),
      h('button', { onClick: this.onChangePropsDemo3 }, '值改变 新的props没有了 删除'),
    ]);
  },
};

/** @format */
import { h } from '../../lib/mini-vue.esm.js';
// import { Foo } from './Foo__props-test.js';
import { Foo } from './Foo__emit-test.js';

export const App = {
  render() {
    window.self = this;
    return h('div', { id: 'root' }, [
      h(
        'h1',
        {
          style: {
            color: 'red',
          },
          onMousedown: () => {
            console.log('mousedown');
          },
        },
        `${this.msg}`
      ),
      h(Foo, {
        onAdd: (num1, num2) => {
          console.log(num1 + num2);
        },
        onAddFoo: (num1, num2) => {
          console.log(num1 + num2);
        },
      }),
    ]);
  },

  setup() {
    return {
      msg: 'zz',
    };
  },
};

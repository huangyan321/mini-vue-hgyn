/** @format */
import { h } from '../../lib/mini-vue.esm.js';
import { Foo } from './Foo.js';
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
          onClick() {
            console.log('click');
          },
          onMousedown() {
            console.log('mousedown');
          },
        },
        `${this.msg}`
      ),
      h(Foo, {
        style: {
          color: 'red',
        },
        parentMsg: 'parentMsg',
        onClick() {
          console.log('click');
        },
        onMousedown() {
          console.log('mousedown');
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

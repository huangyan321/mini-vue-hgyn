/** @format */
import { h, getCurrentInstance } from '../../lib/mini-vue.esm.js';
// import { Foo } from './Foo__props-test.js';
// import { Foo } from './Foo__emit-test.js';
import { Foo } from './Foo__slot-test.js';

export const App = {
  render() {
    window.self = this;
    return h('div', { id: 'root' }, [
      h(
        'h1',
        {
          onMousedown: () => {
            console.log('mousedown');
          },
        },
        `${this.msg}`
      ),
      h(
        Foo,
        {},
        {
          header: ({ title }) => h('span', {}, title),
          footer: ({ content }) => h('span', {}, content),
        }
      ),
    ]);
  },

  setup() {
    const vm = getCurrentInstance();
    console.log(vm);
    return {
      msg: 'zz',
    };
  },
};

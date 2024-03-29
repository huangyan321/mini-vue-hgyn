/** @format */
import { h } from '../../lib/mini-vue.esm.js';
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
        },
        `${this.msg}`
      ),
    ]);
  },

  setup() {
    return {
      msg: 'zz',
    };
  },
};

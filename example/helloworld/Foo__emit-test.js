/** @format */

import { h } from '../../lib/mini-vue.esm.js';

export const Foo = {
  setup(props, { emit }) {
    const handleClick = () => {
      emit('add', 1, 2);
      emit('add-foo', 1, 2);
    };
    return {
      handleClick,
    };
  },
  render() {
    return h('div', { id: 'foo' }, [
      h(
        'button',
        {
          onClick: () => {
            this.handleClick();
          },
        },
        'ADD'
      ),
    ]);
  },
};

/** @format */

import { ref, h } from '../../lib/mini-vue.esm.js';
export const Child = {
  name: 'Child',
  setup(props) {
    return {};
  },
  render() {
    return h('div', { id: 'child' }, [
      h('p', {}, 'child'),
      h('p', {}, 'msg: ' + this.$props.msg),
    ]);
  },
};

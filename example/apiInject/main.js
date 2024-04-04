/** @format */

import { Provider } from './App.js';
import { createApp } from '../../lib/mini-vue.esm.js';

const rootContainer = document.querySelector('#app');
createApp(Provider).mount(rootContainer);

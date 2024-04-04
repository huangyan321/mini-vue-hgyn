/** @format */

import { App } from './App.js';
import { createApp, createRenderer } from '../../lib/mini-vue.esm.js';
console.log(PIXI);
const game = new PIXI.Application();
await game.init({ width: 640, height: 360 });
document.body.append(game.canvas);
const renderer = createRenderer({
  createText(text) {
    return new PIXI.Text({
      text,
    });
  },
  createElement(type) {
    if (type === 'rect') {
      const a = new PIXI.Graphics();
      a.fill(0xff0000);
      a.rect(0, 0, 100, 100);
      a.fill();
      return a;
    }
  },
  patchProps(el, key, val) {
    el[key] = val;
  },
  insert(el, parent) {
    parent.addChild(el);
  },
});
const rootContainer = document.querySelector('#app');
renderer.createApp(App).mount(game.stage);

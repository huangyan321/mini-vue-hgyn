/** @format */
import { reactive, isReactive } from '..';
describe('effect', () => {
  it('happy-path', () => {
    const original = { foo: 1 };
    const observed = reactive(original);
    expect(observed).not.toBe(original);
    expect(observed.foo).toBe(1);
  });
  it('should make nested values reactive', () => {
    const original = { foo: { bar: 1 }, arr: [1, 2, 3] };
    const observed = reactive(original);
    expect(observed.foo).not.toBe(original.foo);
    expect(isReactive(observed)).toBe(true);
    expect(isReactive(observed.foo)).toBe(true);
    expect(isReactive(observed.arr)).toBe(true);
  });
});

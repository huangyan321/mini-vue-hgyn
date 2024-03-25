/** @format */
import { readonly, isReadonly } from '..';
describe('readonly', () => {
  it('happy-path', () => {
    const original = { foo: 1 };
    const observed = readonly(original);
    expect(observed).not.toBe(original);
    expect(observed.foo).toBe(1);
    observed.foo = 2;
    expect(observed.foo).toBe(1);
  });
  it('should make nested values readonly', () => {
    const original = { foo: { bar: 1 } };
    const observed = readonly(original);
    expect(isReadonly(observed)).toBe(true);
    expect(isReadonly(observed.foo)).toBe(true);
  });
  it('warn then call set', () => {
    console.warn = vi.fn();
    const original = { foo: 1 };
    const observed = readonly(original);
    observed.foo = 2;
    expect(console.warn).toBeCalled();
  });
});

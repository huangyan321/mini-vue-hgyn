/** @format */

import { computed, reactive } from '..';
describe('computed', () => {
  it('happy-path', () => {
    const a = computed(() => 1);
    expect(a.value).toBe(1);
  });

  it('should compute lazily', () => {
    const proxyed = reactive({ foo: 1 });
    const getter = vi.fn(() => proxyed.foo);
    const a = computed(getter);
    expect(getter).not.toHaveBeenCalled();
    expect(a.value).toBe(1);
    expect(getter).toHaveBeenCalledTimes(1);
    // computed should cache the value
    a.value;
    expect(getter).toHaveBeenCalledTimes(1);
    // should not compute again
    proxyed.foo = 2;
    expect(a.value).toBe(2);
    expect(getter).toHaveBeenCalledTimes(2);
  });
});


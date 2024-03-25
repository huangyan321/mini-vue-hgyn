/** @format */
import { ref, effect } from '../';
describe('ref', () => {
  it('happy-path', () => {
    const a = ref(1);
    expect(a.value).toBe(1);
    a.value = 2;
    expect(a.value).toBe(2);
  });
  it('should be reactive', () => {
    const a = ref(1);
    let dummy,
      calls = 0;
    effect(() => {
      dummy = a.value;
      calls++;
    });
    expect(dummy).toBe(1);
    expect(calls).toBe(1);
    a.value = 2;
    expect(dummy).toBe(2);
    expect(calls).toBe(2);
    a.value = 2;
    expect(dummy).toBe(2);
    expect(calls).toBe(2);
  });
  it('should make nested values reactive', () => {
    const a = ref({ foo: 1 });
    let dummy,
      calls = 0;
    effect(() => {
      dummy = a.value.foo;
      calls++;
    });
    expect(dummy).toBe(1);
    expect(calls).toBe(1);
    a.value.foo = 2;
    expect(dummy).toBe(2);
    expect(calls).toBe(2);
  });
});

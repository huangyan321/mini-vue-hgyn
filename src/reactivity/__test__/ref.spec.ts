/** @format */
import { ref, effect, proxyRef, isRef, reactive } from '../';
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
  it('isRef', () => {
    const a = ref(1);
    const user = reactive({ age: 1 });
    expect(isRef(a)).toBe(true);
    expect(isRef(1)).toBe(false);
    expect(isRef({ value: 1 })).toBe(false);
    expect(isRef(user)).toBe(false);
  });
  it('proxyRef', () => {
    const a = ref(1);
    const b = ref(2);
    const p = proxyRef({ a, b });
    let dummy,
      calls = 0;
    effect(() => {
      dummy = p.a;
      calls++;
    });
    expect(dummy).toBe(1);
    expect(calls).toBe(1);
    p.a = 2;
    expect(dummy).toBe(2);
    expect(calls).toBe(2);
  });
});

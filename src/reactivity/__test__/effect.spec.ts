/** @format */

import { reactive, effect, stop } from '..';
/** @format */
describe('effect', () => {
  it('happy-path', () => {
    const user = reactive({
      age: 10,
    });
    let nextAge;
    effect(() => {
      nextAge = user.age + 1;
    });
    expect(nextAge).toBe(11);

    user.age++;
    expect(nextAge).toBe(12);
  });

  it('should return runner when call effect', () => {
    let foo = 10;
    let runner = effect(() => {
      foo++;
      return 'foo';
    });
    expect(foo).toBe(11);
    const res = runner();
    expect(foo).toBe(12);
    expect(res).toBe('foo');
  });

  it('should observe multiple properties', () => {
    const user = reactive({
      age: 10,
      name: 'xiaoming',
    });
    let nextAge;
    effect(() => {
      nextAge = user.age + 1;
    });
    expect(nextAge).toBe(11);

    user.age++;
    expect(nextAge).toBe(12);
  });

  it('scheduler', () => {
    let dummy;
    let run: any;
    const scheduler = vi.fn((runner) => {
      run = runner;
    });
    const obj = reactive({ foo: 1 });
    effect(
      () => {
        dummy = obj.foo;
      },
      { scheduler }
    );
    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);
    obj.foo = 2;
    expect(dummy).toBe(1);
    run();
    expect(dummy).toBe(2);
  });

  it('stop', () => {
    let dummy;
    const obj = reactive({ prop: 1 });
    const runner = effect(() => {
      dummy = obj.prop;
    });
    obj.prop = 2;
    expect(dummy).toBe(2);
    stop(runner);
    obj.prop = 3;
    expect(dummy).toBe(2);
    runner();
    expect(dummy).toBe(3);
  });
});

/** @format */

export const assign = Object.assign;

export const isObject = (val: any) => val !== null && typeof val === 'object';

export const hasChanged = (value: any, oldValue: any) => {
  return !Object.is(value, oldValue);
};

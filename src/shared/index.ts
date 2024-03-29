/** @format */

export const assign = Object.assign;

export const isObject = (val: any) => val !== null && typeof val === 'object';

export const hasChanged = (value: any, oldValue: any) => {
  return !Object.is(value, oldValue);
};

export const hasOwn = (obj: any, key: any) =>
  Object.prototype.hasOwnProperty.call(obj, key);

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const camelize = (str: string) => {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
};

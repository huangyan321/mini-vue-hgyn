/** @format */
import { capitalize, camelize } from 'src/shared';
export function emit(instance: any, event: any, ...args: any[]) {
  const { props } = instance;
  const toHandlerKey = (str?: string) => {
    return str ? 'on' + capitalize(str) : '';
  };

  const handlerName = toHandlerKey(camelize(event));

  const handler = props[handlerName];

  handler && handler(...args);
}

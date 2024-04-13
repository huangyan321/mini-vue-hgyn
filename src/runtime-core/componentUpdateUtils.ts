/** @format */

export function shouldUpdateComponent(n1: any, n2: any) {
  const { props: newProps } = n2;
  const { props: oldProps } = n1;
  if (newProps === oldProps) return false;
  for (const key in newProps) {
    if (newProps[key] !== oldProps[key]) return true;
  }
  return false;
}

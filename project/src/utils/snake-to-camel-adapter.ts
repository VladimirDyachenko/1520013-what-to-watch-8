/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
function toCamel(s: string): string {
  return s.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
}

export function keysToCamel(o: any): unknown {
  if (o === Object(o) && !Array.isArray(o) && typeof o !== 'function') {
    const n: { [key: string]: any } = {};
    Object.keys(o).forEach((k) => { n[toCamel(k)] = keysToCamel(o[k]); });
    return n;
  } else if (Array.isArray(o)) {
    return o.map((i) => keysToCamel(i));
  } return o;
}

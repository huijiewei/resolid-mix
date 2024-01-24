export type AnyFunction<A = unknown, R = unknown> = (...args: A[]) => R;
export type MaybeFunction<T, A extends unknown[] = []> = T | AnyFunction<A, T>;

export const isFunction = <T = AnyFunction>(value: unknown): value is T => typeof value === 'function';

export const runIfFn = <R, A>(valueOrFn: R | ((...fnArgs: A[]) => R), ...args: A[]): R => {
  return isFunction<AnyFunction<A, R>>(valueOrFn) ? valueOrFn(...args) : valueOrFn;
};

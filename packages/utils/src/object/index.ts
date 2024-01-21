export const omit = <T extends object, K extends keyof T>(object: T, keys: K[]) => {
  return keys.reduce(
    (acc, key) => {
      delete acc[key];
      return acc;
    },
    { ...object },
  ) as Omit<T, K>;
};

export const hasOwnProperty = <T extends object>(object: T, prop: string | number | symbol): prop is keyof T => {
  if (typeof Object.hasOwn === 'function') {
    return Object.hasOwn(object, prop);
  }

  return Object.prototype.hasOwnProperty.call(object, prop);
};

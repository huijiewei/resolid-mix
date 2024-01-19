export const omit = <T extends object, K extends keyof T>(object: T, keys: K[]) => {
  return keys.reduce(
    (acc, key) => {
      delete acc[key];
      return acc;
    },
    { ...object },
  ) as Omit<T, K>;
};

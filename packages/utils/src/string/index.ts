export const isString = (value: unknown): value is string => {
  return Object.prototype.toString.call(value) === '[object String]';
};

export const isEmpty = (value: string | undefined | null) => {
  return value === undefined || value === null || value.trim().length === 0;
};

export const isUsername = (value: string) => {
  return /^[a-z][a-z0-9_\\.]*$/.test(value);
};

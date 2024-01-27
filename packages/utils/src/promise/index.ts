export const wait = (delay: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

export const to = async <T, E = Error>(promise: Promise<T>): Promise<[E, undefined] | [null, T]> => {
  return promise.then<[null, T]>((data) => [null, data]).catch<[E, undefined]>((error: E) => [error, undefined]);
};

export const debounce = (fn: () => void, delay: number): (() => void) => {
  let invoked = false;
  return () => {
    invoked = true;
    setTimeout(() => {
      if (invoked) fn();
      invoked = false;
    }, delay);
  };
};

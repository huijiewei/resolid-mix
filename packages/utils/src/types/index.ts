export type Overwrite<T, U> = Omit<T, keyof U> & U;

export type Booleanish = boolean | 'true' | 'false';

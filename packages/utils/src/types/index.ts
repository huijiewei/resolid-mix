export type Merge<T, P> = P & Omit<T, keyof P>;

export type Assign<T, P> = Omit<T, keyof P> & P;

export type Booleanish = boolean | 'true' | 'false';

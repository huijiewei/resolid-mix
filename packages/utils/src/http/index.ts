import { startWith } from '../string';

export const isExternalUrl = (url: string) => {
  return startWith(url, 'http://') || startWith(url, 'https://');
};

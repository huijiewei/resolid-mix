import type { Booleanish } from '../types';

export const isBrowser = () => {
  return typeof window !== 'undefined' && !!window.document?.createElement;
};

export const dataAttr = (condition: boolean | null | undefined) => (condition ? '' : undefined) as Booleanish;

export const ariaAttr = (condition: boolean | null | undefined) => (condition ? true : undefined);

export const isButton = (element: { tagName: string; type?: string }) => {
  const tagName = element.tagName.toLowerCase();

  if (tagName === 'button') {
    return true;
  }

  if (tagName === 'input' && element.type) {
    return ['button', 'color', 'file', 'image', 'reset', 'submit'].indexOf(element.type) !== -1;
  }

  return false;
};

// @vitest-environment jsdom

import { describe, expect, test } from 'vitest';
import type { Booleanish } from '../boolean';
import { ariaAttr, dataAttr, isBrowser, isButton, isInputEvent } from './index';
describe('isBrowser function', () => {
  test('should return true in a browser environment', () => {
    expect(isBrowser()).toBe(true);
  });

  test('should return false in a non-browser environment', () => {
    // @ts-expect-error Type undefined is not assignable to type Window
    global.window = undefined;
    expect(isBrowser()).toBe(false);
  });
});

describe('dataAttr function', () => {
  test('should return an empty string for a truthy condition', () => {
    const result: Booleanish = dataAttr(true);
    expect(result).toBe('');
  });

  test('should return undefined for a falsy condition', () => {
    const result: Booleanish = dataAttr(false);
    expect(result).toBe(undefined);
  });
});

describe('ariaAttr function', () => {
  test('should return true for a truthy condition', () => {
    const result = ariaAttr(true);
    expect(result).toBe(true);
  });

  test('should return undefined for a falsy condition', () => {
    const result = ariaAttr(false);
    expect(result).toBe(undefined);
  });
});

describe('isButton function', () => {
  test('should return true for a button element', () => {
    const buttonElement = { tagName: 'button' };
    expect(isButton(buttonElement)).toBe(true);
  });

  test('should return true for certain input types', () => {
    const inputElement = { tagName: 'input', type: 'submit' };
    expect(isButton(inputElement)).toBe(true);
  });

  test('should return false for other input types', () => {
    const inputElement = { tagName: 'input', type: 'text' };
    expect(isButton(inputElement)).toBe(false);
  });
});

describe('isInputEvent function', () => {
  test('should return true for a valid input event object', () => {
    const inputEvent = { target: document.createElement('input') };
    expect(isInputEvent(inputEvent)).toBe(true);
  });

  test('should return false for an invalid input event object', () => {
    const invalidInputEvent = { target: 'not an input element' };
    expect(isInputEvent(invalidInputEvent)).toBe(false);
  });
});

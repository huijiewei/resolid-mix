import { describe, expect, test } from 'vitest';
import { isString } from './index';

describe('isString function', () => {
  test('should return true for a string', () => {
    const stringValue = 'Hello, world!';
    expect(isString(stringValue)).toBe(true);
  });

  test('should return false for a non-string value', () => {
    const numberValue = 42;
    const booleanValue = true;
    const objectValue = { key: 'value' };

    expect(isString(numberValue)).toBe(false);
    expect(isString(booleanValue)).toBe(false);
    expect(isString(objectValue)).toBe(false);
  });

  test('should return false for null or undefined', () => {
    const nullValue = null;
    const undefinedValue = undefined;

    expect(isString(nullValue)).toBe(false);
    expect(isString(undefinedValue)).toBe(false);
  });
});

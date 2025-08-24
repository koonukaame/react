import { expect, it } from 'vitest';
import { convertFileToBase64 } from './convertToBase64';

it('converts a file to a base64 string', async () => {
  const file = new File(['hello world'], 'hello.txt', { type: 'text/plain' });

  const result = await convertFileToBase64(file);
  expect(result).toBeTypeOf('string');
  expect(result.startsWith('data:text/plain;base64,')).toBe(true);
});

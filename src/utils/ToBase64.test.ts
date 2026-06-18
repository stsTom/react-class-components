import { describe, it, expect } from 'vitest';
import { fileToBase64 } from './ToBase64';

describe('fileToBase64', () => {
  it('resolves with a data URL for a valid file', async () => {
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    const result = await fileToBase64(file);
    expect(result).toMatch(/^data:text\/plain;base64,/);
  });

  it('the base64 payload decodes back to the original content', async () => {
    const content = 'test-content';
    const file = new File([content], 'test.txt', { type: 'text/plain' });
    const result = await fileToBase64(file);
    const base64Part = result.split(',')[1];
    expect(atob(base64Part)).toBe(content);
  });

  it('handles binary (image) files', async () => {
    const bytes = new Uint8Array([137, 80, 78, 71]);
    const file = new File([bytes], 'img.png', { type: 'image/png' });
    const result = await fileToBase64(file);
    expect(result).toMatch(/^data:image\/png;base64,/);
  });
});
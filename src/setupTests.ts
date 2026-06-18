import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(cleanup);

if (typeof DataTransfer === 'undefined') {
  class DataTransferPolyfill {
    private _files: File[] = [];

    items = {
      add: (file: File) => {
        this._files.push(file);
      },
    };

    get files(): FileList {
      const files = this._files;
      const fileList = Object.create(FileList.prototype) as FileList;

      Object.defineProperty(fileList, 'length', { get: () => files.length });
      Object.defineProperty(fileList, 'item', {
        value: (index: number) => files[index] ?? null,
      });
      Object.defineProperty(fileList, Symbol.iterator, {
        value: function* () { yield* files; },
      });

      files.forEach((file, i) => {
        Object.defineProperty(fileList, i, { get: () => file });
      });

      return fileList;
    }
  }

  (globalThis as unknown as Record<string, unknown>).DataTransfer = DataTransferPolyfill;
}
import { describe, it, expect } from 'vitest';
import { schema } from './FormValidationSchema';

function makeFileList(file: File): FileList {
  const dt = new DataTransfer();
  dt.items.add(file);
  return dt.files;
}

function makeImageFile(name = 'photo.png', type = 'image/png', sizeBytes = 1024) {
  return new File([new Uint8Array(sizeBytes)], name, { type });
}

const validBase = {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com',
  password: 'secret123',
  confirmPassword: 'secret123',
  image: makeFileList(makeImageFile()),
  country: 'Poland',
};

describe('FormValidationSchema', () => {
  describe('name', () => {
    it('rejects empty name', async () => {
      await expect(schema.validateAt('name', { name: '' })).rejects.toThrow('Name is required');
    });

    it('rejects lowercase first letter', async () => {
      await expect(schema.validateAt('name', { name: 'alice' })).rejects.toThrow(
        'First letter must be uppercase'
      );
    });

    it('accepts name starting with uppercase', async () => {
      await expect(schema.validateAt('name', { name: 'Alice' })).resolves.toBe('Alice');
    });
  });

  describe('age', () => {
    it('rejects negative age', async () => {
      await expect(schema.validateAt('age', { age: -1 })).rejects.toThrow('Age cannot be negative');
    });

    it('rejects non-numeric string', async () => {
      await expect(schema.validateAt('age', { age: 'abc' as unknown as number })).rejects.toThrow(
        'Age must be a number'
      );
    });

    it('accepts zero', async () => {
      await expect(schema.validateAt('age', { age: 0 })).resolves.toBe(0);
    });
  });

  describe('email', () => {
    it('rejects missing @', async () => {
      await expect(schema.validateAt('email', { email: 'notanemail' })).rejects.toThrow();
    });

    it('rejects domain starting with dot', async () => {
      await expect(schema.validateAt('email', { email: 'a@.bad.com' })).rejects.toThrow();
    });

    it('accepts valid email', async () => {
      await expect(schema.validateAt('email', { email: 'user@example.com' })).resolves.toBe(
        'user@example.com'
      );
    });
  });

  describe('password', () => {
    it('rejects password shorter than 6 chars', async () => {
      await expect(schema.validateAt('password', { password: 'abc' })).rejects.toThrow(
        'at least 6 characters'
      );
    });

    it('accepts password of 6+ chars', async () => {
      await expect(schema.validateAt('password', { password: 'abcdef' })).resolves.toBe('abcdef');
    });
  });

  describe('confirmPassword', () => {
    it('rejects mismatched passwords', async () => {
      await expect(
        schema.validate({ ...validBase, confirmPassword: 'different' })
      ).rejects.toThrow('Passwords must match');
    });

    it('accepts matching passwords', async () => {
      await expect(schema.validate(validBase)).resolves.toBeDefined();
    });
  });

  describe('image', () => {
    it('rejects missing file', async () => {
      const emptyList = new DataTransfer().files;
      await expect(schema.validateAt('image', { image: emptyList })).rejects.toThrow(
        'Image is required'
      );
    });

    it('rejects file exceeding 5 MB', async () => {
      const bigFile = makeImageFile('big.png', 'image/png', 6 * 1024 * 1024);
      await expect(
        schema.validateAt('image', { image: makeFileList(bigFile) })
      ).rejects.toThrow('5 MB');
    });

    it('rejects non-image type', async () => {
      const pdf = new File(['data'], 'doc.pdf', { type: 'application/pdf' });
      await expect(
        schema.validateAt('image', { image: makeFileList(pdf) })
      ).rejects.toThrow('PNG and JPEG');
    });

    it('accepts valid PNG under 5 MB', async () => {
      await expect(
        schema.validateAt('image', { image: makeFileList(makeImageFile()) })
      ).resolves.toBeDefined();
    });
  });

  describe('country', () => {
    it('rejects an unlisted country', async () => {
      await expect(
        schema.validateAt('country', { country: 'Narnia' })
      ).rejects.toThrow('valid country');
    });

    it('accepts a listed country', async () => {
      await expect(
        schema.validateAt('country', { country: 'Poland' })
      ).resolves.toBe('Poland');
    });
  });
});
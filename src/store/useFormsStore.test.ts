import { describe, it, expect, beforeEach } from 'vitest';
import { useFormsStore } from './useFormsStore';

const baseSubmission = {
  source: 'React Hook Form' as const,
  name: 'Alice',
  age: 25,
  email: 'alice@example.com',
  country: 'Poland',
  imageName: 'photo.png',
  imageBase64: 'data:image/png;base64,abc',
};

beforeEach(() => {
  useFormsStore.setState({ submissions: [] });
});

describe('useFormsStore', () => {
  describe('initial state', () => {
    it('starts with an empty submissions list', () => {
      const { submissions } = useFormsStore.getState();
      expect(submissions).toHaveLength(0);
    });

    it('has a non-empty countries list', () => {
      const { countries } = useFormsStore.getState();
      expect(countries.length).toBeGreaterThan(0);
    });
  });

  describe('addSubmission', () => {
    it('adds a submission with a generated id and timestamp', () => {
      useFormsStore.getState().addSubmission(baseSubmission);
      const { submissions } = useFormsStore.getState();
      expect(submissions).toHaveLength(1);
      expect(submissions[0].id).toBeTruthy();
      expect(submissions[0].submittedAt).toBeInstanceOf(Date);
    });

    it('prepends new submissions (newest first)', () => {
      useFormsStore.getState().addSubmission({ ...baseSubmission, name: 'Alice' });
      useFormsStore.getState().addSubmission({ ...baseSubmission, name: 'Bob' });
      const { submissions } = useFormsStore.getState();
      expect(submissions[0].name).toBe('Bob');
      expect(submissions[1].name).toBe('Alice');
    });

    it('stores all provided fields correctly', () => {
      useFormsStore.getState().addSubmission(baseSubmission);
      const s = useFormsStore.getState().submissions[0];
      expect(s.source).toBe('React Hook Form');
      expect(s.name).toBe('Alice');
      expect(s.age).toBe(25);
      expect(s.email).toBe('alice@example.com');
      expect(s.country).toBe('Poland');
      expect(s.imageName).toBe('photo.png');
    });
  });
});
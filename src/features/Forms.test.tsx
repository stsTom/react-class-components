import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactHookFormComponent } from './react_hook_form/ReactHookForm';
import { UncontrolledForm } from './uncontrolled_forms/UncontrolledForm';
import { useFormsStore } from '../store/useFormsStore';

vi.mock('../components/CountryList', () => ({
  CountryDatalist: ({ id }: { id: string }) => <datalist id={id} />,
}));

vi.mock('../components/ErrorField', () => ({
  ErrorField: ({ message }: { message?: string }) =>
    message ? <small role="alert">{message}</small> : null,
}));

vi.mock('../components/PasswordStrengthBar', () => ({
  PasswordStrengthBar: () => null,
}));

vi.mock('../utils/ToBase64', () => ({
  fileToBase64: vi.fn().mockResolvedValue('data:image/png;base64,fakebase64'),
}));

function makeImageFile() {
  return new File([new Uint8Array(100)], 'photo.png', { type: 'image/png' });
}

describe('ReactHookFormComponent', () => {
  beforeEach(() => useFormsStore.setState({ submissions: [] }));

  describe('rendering', () => {
    it('renders all form fields', () => {
      render(<ReactHookFormComponent closeModal={vi.fn()} />);
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^age/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/profile image/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    });
  });

  describe('validation', () => {
    it('shows an error when name starts with lowercase', async () => {
      render(<ReactHookFormComponent closeModal={vi.fn()} />);
      await userEvent.type(screen.getByLabelText(/name/i), 'alice');
      fireEvent.blur(screen.getByLabelText(/name/i));
      await waitFor(() =>
        expect(screen.getByRole('alert')).toHaveTextContent(/uppercase/i)
      );
    });

    it('shows a password-mismatch error', async () => {
      render(<ReactHookFormComponent closeModal={vi.fn()} />);
      await userEvent.type(screen.getByLabelText(/^password$/i), 'secret123');
      await userEvent.type(screen.getByLabelText(/confirm password/i), 'wrong');
      fireEvent.blur(screen.getByLabelText(/confirm password/i));
      await waitFor(() =>
        expect(screen.getAllByRole('alert').some((el) => /match/i.test(el.textContent ?? ''))).toBe(
          true
        )
      );
    });
  });

  describe('submission', () => {
    it('calls closeModal and adds a submission on valid data', async () => {
      const closeModal = vi.fn();
      render(<ReactHookFormComponent closeModal={closeModal} />);
      await userEvent.type(screen.getByLabelText(/name/i), 'Alice');
      await userEvent.type(screen.getByLabelText(/^age/i), '25');
      await userEvent.type(screen.getByLabelText(/email/i), 'alice@example.com');
      await userEvent.type(screen.getByLabelText(/^password$/i), 'secret123');
      await userEvent.type(screen.getByLabelText(/confirm password/i), 'secret123');
      await userEvent.upload(screen.getByLabelText(/profile image/i), makeImageFile());
      await userEvent.type(screen.getByLabelText(/country/i), 'Poland');
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      await waitFor(() => expect(closeModal).toHaveBeenCalledTimes(1));
      expect(useFormsStore.getState().submissions).toHaveLength(1);
      expect(useFormsStore.getState().submissions[0].source).toBe('React Hook Form');
    });
  });
});

describe('UncontrolledForm', () => {
  beforeEach(() => useFormsStore.setState({ submissions: [] }));

  describe('rendering', () => {
    it('renders all form fields', () => {
      render(<UncontrolledForm closeModal={vi.fn()} />);
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^age/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/profile image/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    });
  });

  describe('validation', () => {
    it('shows validation errors on empty submit', async () => {
      render(<UncontrolledForm closeModal={vi.fn()} />);
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      await waitFor(() =>
        expect(screen.getAllByRole('alert').length).toBeGreaterThan(0)
      );
    });

    it('shows only the first error per field', async () => {
      render(<UncontrolledForm closeModal={vi.fn()} />);
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      await waitFor(() => {
        const alerts = screen.getAllByRole('alert');
        const messages = alerts.map((el) => el.textContent);
        const nameErrors = messages.filter((m) => /name/i.test(m ?? ''));
        expect(nameErrors).toHaveLength(1);
      });
    });
  });

  describe('submission', () => {
    it('calls closeModal and saves submission on valid data', async () => {
      const closeModal = vi.fn();
      render(<UncontrolledForm closeModal={closeModal} />);

      await userEvent.type(screen.getByLabelText(/name/i), 'Alice');
      await userEvent.type(screen.getByLabelText(/^age/i), '25');
      await userEvent.type(screen.getByLabelText(/email/i), 'alice@example.com');
      await userEvent.type(screen.getByLabelText(/^password$/i), 'secret123');
      await userEvent.type(screen.getByLabelText(/confirm/i), 'secret123');
      await userEvent.upload(screen.getByLabelText(/profile image/i), makeImageFile());
      await userEvent.type(screen.getByLabelText(/country/i), 'Poland');
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => expect(closeModal).toHaveBeenCalledTimes(1));
      expect(useFormsStore.getState().submissions[0].source).toBe('Uncontrolled Form');
    });
  });
});
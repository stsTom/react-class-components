import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Modal } from './Modal';

vi.mock('./Portal', () => ({
  Portal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Modal', () => {
  describe('rendering', () => {
    it('renders children when open', () => {
      render(
        <Modal isOpen={true} closeModal={vi.fn()}>
          <span>Modal content</span>
        </Modal>
      );
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('renders nothing when closed', () => {
      render(
        <Modal isOpen={false} closeModal={vi.fn()}>
          <span>Hidden</span>
        </Modal>
      );
      expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
    });

    it('renders a <dialog> element with open attribute', () => {
      const { container } = render(
        <Modal isOpen={true} closeModal={vi.fn()}>
          content
        </Modal>
      );
      const dialog = container.querySelector('dialog');
      expect(dialog).not.toBeNull();
      expect(dialog).toHaveAttribute('open');
    });
  });

  describe('closing behaviour', () => {
    it('calls closeModal when Escape is pressed', () => {
      const closeModal = vi.fn();
      render(
        <Modal isOpen={true} closeModal={closeModal}>
          content
        </Modal>
      );
      fireEvent.keyDown(document.body, { key: 'Escape' });
      expect(closeModal).toHaveBeenCalledTimes(1);
    });

    it('does not call closeModal for other keys', () => {
      const closeModal = vi.fn();
      render(
        <Modal isOpen={true} closeModal={closeModal}>
          content
        </Modal>
      );
      fireEvent.keyDown(document.body, { key: 'Enter' });
      expect(closeModal).not.toHaveBeenCalled();
    });

    it('removes the keydown listener on unmount', () => {
      const closeModal = vi.fn();
      const { unmount } = render(
        <Modal isOpen={true} closeModal={closeModal}>
          content
        </Modal>
      );
      unmount();
      fireEvent.keyDown(document.body, { key: 'Escape' });
      expect(closeModal).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('wraps content in an <article> for landmark semantics', () => {
      const { container } = render(
        <Modal isOpen={true} closeModal={vi.fn()}>
          content
        </Modal>
      );
      expect(container.querySelector('article')).not.toBeNull();
    });
  });
});
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormsModal } from "./FormsModal";

vi.mock('../react_hook_form/ReactHookForm', () => ({
  ReactHookFormComponent: () => (
    <div>React Hook Form</div>
  ),
}));

vi.mock('../uncontrolled_forms/UncontrolledForm', () => ({
  UncontrolledForm: () => (
    <div>Uncontrolled Form</div>
  ),
}));

describe('FormsModal', () => {
  it('renders React Hook Form by default', () => {
    render(<FormsModal isModalOpen={true} setIsModalOpen={vi.fn()} />);

    expect(screen.getByText(/React Hook Form/i, { selector: 'div' })).toBeInTheDocument();
    expect(screen.queryByText(/Uncontrolled Form/i, { selector: 'div' })).not.toBeInTheDocument();
  });

  it('renders Uncontrolled Form after toggling the switch', async () => {
    render(<FormsModal isModalOpen={true} setIsModalOpen={vi.fn()} />);

    await userEvent.click(screen.getByRole('switch'));

    expect(screen.getByText(/Uncontrolled Form/i, { selector: 'div' })).toBeInTheDocument();
    expect(screen.queryByText(/React Hook Form/i, { selector: 'div' })).not.toBeInTheDocument();
  });
});
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach, Mock } from 'vitest';
import { AddCard } from '..';

describe('AddCard Component', () => {
  let setCardsMock: Mock;
  beforeEach(() => {
    setCardsMock = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the "Add card" button initially', () => {
    render(<AddCard column="todo" setCards={setCardsMock} />);
    expect(screen.getByText(/Add card/i)).toBeInTheDocument();
  });

  it('shows input form when clicking "Add card"', () => {
    render(<AddCard column="todo" setCards={setCardsMock} />);
    fireEvent.click(screen.getByText(/Add card/i));

    expect(screen.getByPlaceholderText(/Add new task/i)).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<AddCard column="todo" setCards={setCardsMock} />);
    fireEvent.click(screen.getByText(/Add card/i));

    const textarea = screen.getByPlaceholderText(/Add new task/i);
    fireEvent.change(textarea, { target: { value: 'New task' } });

    expect(textarea).toHaveValue('New task');
  });

  it('calls setCards with new card when submitting', () => {
    render(<AddCard column="todo" setCards={setCardsMock} />);
    fireEvent.click(screen.getByText(/Add card/i));

    const textarea = screen.getByPlaceholderText(/Add new task/i);
    fireEvent.change(textarea, { target: { value: 'New task' } });

    fireEvent.submit(textarea.closest('form')!);

    expect(setCardsMock).toHaveBeenCalledTimes(1);
    expect(setCardsMock).toHaveBeenCalledWith(expect.any(Function));
  });

  it('prevents adding an empty card', () => {
    render(<AddCard column="todo" setCards={setCardsMock} />);
    fireEvent.click(screen.getByText(/Add card/i));

    fireEvent.submit(
      screen.getByPlaceholderText(/Add new task/i).closest('form')!
    );

    expect(setCardsMock).not.toHaveBeenCalled();
  });

  it('closes the form when "Close" is clicked', () => {
    render(<AddCard column="todo" setCards={setCardsMock} />);
    fireEvent.click(screen.getByText(/Add card/i));

    fireEvent.click(screen.getByText(/Close/i));

    expect(screen.getByText(/Add card/i)).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AddCard } from './AddCard';
import React from 'react';

describe('AddCard Component', () => {
  const setCardsMock = vi.fn();
  it('renders the "Add card" button initially', () => {
    render(<AddCard column="todo" setCards={setCardsMock} />);
    expect(screen.getByText(/Add card/i)).toBeInTheDocument();
  });

  it('shows input form when clicking "Add card"', () => {
    render(<AddCard column="todo" setCards={setCardsMock} />);
    fireEvent.click(screen.getByText(/Add card/i));

    expect(screen.getByPlaceholderText(/Add new task/i)).toBeInTheDocument();
    expect(screen.getByText(/Close/i)).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<AddCard column="todo" setCards={setCardsMock} />);
    fireEvent.click(screen.getByText(/Add card/i));

    const textarea = screen.getByPlaceholderText(/Add new task/i);
    fireEvent.change(textarea, { target: { value: 'New task' } });

    expect(textarea).toHaveValue('New task');
  });

  it('calls setCards with new card when submitting', () => {
    const setCardsMock = vi.fn();
    const preventDefault = vi.fn();

    render(<AddCard column="todo" setCards={setCardsMock} />);
    fireEvent.click(screen.getByText(/Add card/i));

    const textarea = screen.getByPlaceholderText(/Add new task/i);
    fireEvent.change(textarea, { target: { value: 'New task' } });

    const form = textarea.closest('form')!;
    const submitEvent = new Event('submit', { bubbles: true });
    Object.defineProperty(submitEvent, 'preventDefault', {
      value: preventDefault,
    });

    fireEvent(form, submitEvent);

    expect(preventDefault).toHaveBeenCalled();

    expect(setCardsMock).toHaveBeenCalledTimes(1);
    const updateFunction = setCardsMock.mock.calls[0][0];
    const prevState: [] = [];
    const newState = updateFunction(prevState);
    expect(newState[0]).toMatchObject({
      column: 'todo',
      title: 'New task',
    });

    expect(textarea.textContent).toBe('');
    expect(textarea).not.toBeInTheDocument();
  });

  it('prevents adding an empty card', () => {
    const setCardsMock = vi.fn();
    const preventDefault = vi.fn();
    const setAdding = vi.fn();

    vi.spyOn(React, 'useState').mockImplementation(() => [true, setAdding]);

    render(<AddCard column="todo" setCards={setCardsMock} />);
    fireEvent.click(screen.getByText(/Add card/i));

    const form = screen.getByPlaceholderText(/Add new task/i).closest('form')!;
    const submitEvent = new Event('submit', { bubbles: true });
    Object.defineProperty(submitEvent, 'preventDefault', {
      value: preventDefault,
    });

    fireEvent(form, submitEvent);

    expect(preventDefault).toHaveBeenCalled();

    expect(setCardsMock).not.toHaveBeenCalled();

    expect(setAdding).not.toHaveBeenCalled();
  });

  it('closes the form when "Close" is clicked', () => {
    render(<AddCard column="todo" setCards={setCardsMock} />);
    fireEvent.click(screen.getByText(/Add card/i));

    fireEvent.click(screen.getByText(/Close/i));

    expect(screen.getByText(/Add card/i)).toBeInTheDocument();
  });
});

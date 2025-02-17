import { render, screen, fireEvent } from '@testing-library/react';
import { BurnBarrel } from './BurnBarrel';
import { describe, it, expect, vi, afterEach, beforeEach, Mock } from 'vitest';

describe('BurnBarrel Component', () => {
  let setCardsMock: Mock;

  beforeEach(() => {
    setCardsMock = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the trash can icon by default', () => {
    render(<BurnBarrel setCards={setCardsMock} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button').querySelector('svg')).toBeTruthy();
  });

  it('changes the style when the element is hovered (dragover)', () => {
    render(<BurnBarrel setCards={setCardsMock} />);
    const burnBarrel = screen.getByRole('button');

    fireEvent.dragOver(burnBarrel);

    expect(burnBarrel).toHaveClass('border-red-800');
    expect(burnBarrel).toHaveClass('bg-red-800/20');
    expect(burnBarrel).toHaveClass('text-red-500');
  });

  it('returns the style when the element leaves (dragleave)', () => {
    render(<BurnBarrel setCards={setCardsMock} />);
    const burnBarrel = screen.getByRole('button');

    fireEvent.dragOver(burnBarrel);
    fireEvent.dragLeave(burnBarrel);

    expect(burnBarrel).toHaveClass('border-neutral-500');
    expect(burnBarrel).toHaveClass('bg-neutral-500/20');
    expect(burnBarrel).toHaveClass('text-neutral-500');
  });

  it('removes the card when dropped', () => {
    render(<BurnBarrel setCards={setCardsMock} />);
    const burnBarrel = screen.getByRole('button');

    const mockEvent = {
      preventDefault: vi.fn(),
      dataTransfer: {
        getData: vi.fn().mockReturnValue('card-1'),
      },
    } as unknown as React.DragEvent<HTMLDivElement>;

    fireEvent.drop(burnBarrel, mockEvent);

    expect(setCardsMock).toHaveBeenCalledTimes(1);
    expect(setCardsMock).toHaveBeenCalledWith(expect.any(Function));

    const updateFunction = setCardsMock.mock.calls[0][0];
    const mockPrevState = [{ id: 'card-1' }, { id: 'card-2' }];
    expect(updateFunction(mockPrevState)).toEqual([{ id: 'card-2' }]);
  });
});

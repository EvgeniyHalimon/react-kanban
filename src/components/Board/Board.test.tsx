import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { BurnBarrel, Board } from '..';

describe('Board Component', () => {
  test('renders Board component with columns and cards', () => {
    render(<Board />);

    const backlogColumn = screen.getByText('Backlog');
    const todoColumn = screen.getByText('TODO');
    const doingColumn = screen.getByText('In progress');
    const doneColumn = screen.getByText('Complete');

    expect(backlogColumn).toBeInTheDocument();
    expect(todoColumn).toBeInTheDocument();
    expect(doingColumn).toBeInTheDocument();
    expect(doneColumn).toBeInTheDocument();
  });

  test('should allow cards to be removed by BurnBarrel', () => {
    const setCardsMock = vi.fn();
    const preventDefault = vi.fn();

    render(<BurnBarrel setCards={setCardsMock} />);
    const burnBarrel = screen.getByRole('button');

    const dropEvent = new Event('drop', { bubbles: true });
    Object.defineProperty(dropEvent, 'preventDefault', {
      value: preventDefault,
    });
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: {
        getData: vi.fn().mockReturnValue('card-1'),
      },
    });

    const dragOverEvent = new Event('dragover', { bubbles: true });
    Object.defineProperty(dragOverEvent, 'preventDefault', {
      value: preventDefault,
    });

    fireEvent(burnBarrel, dragOverEvent);
    fireEvent(burnBarrel, dropEvent);

    expect(preventDefault).toHaveBeenCalledTimes(2);
    expect(setCardsMock).toHaveBeenCalledTimes(1);

    const updateFunction = setCardsMock.mock.calls[0][0];
    const mockPrevState = [{ id: 'card-1' }, { id: 'card-2' }];
    expect(updateFunction(mockPrevState)).toEqual([{ id: 'card-2' }]);
  });
});

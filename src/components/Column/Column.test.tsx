import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Column } from './Column';
import { CardType, ColumnType } from '../../types';

const mockSetCards = vi.fn();

const mockCards: CardType[] = [
  { id: 'card-1', title: 'Card 1', column: 'todo' },
  { id: 'card-2', title: 'Card 2', column: 'todo' },
];

const columnProps = {
  title: 'To Do',
  headingColor: 'text-blue-500',
  cards: mockCards,
  column: 'todo' as ColumnType,
  setCards: mockSetCards,
};

describe('Column Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the title and number of cards', () => {
    render(<Column {...columnProps} />);

    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
  });

  it('starts a drag event and sets the cardId', () => {
    render(<Column {...columnProps} />);

    const card = screen.getByText('Card 1').closest('div')!;
    const mockEvent = {
      dataTransfer: { setData: vi.fn() },
    } as unknown as React.DragEvent<HTMLDivElement>;

    fireEvent.dragStart(card, mockEvent);

    expect(mockEvent.dataTransfer.setData).toHaveBeenCalledWith(
      'cardId',
      'card-1'
    );
  });

  it('removes highlighting when drag leave', () => {
    render(<Column {...columnProps} />);
    const columnElement = screen.getByText('To Do').closest('div')!;

    fireEvent.dragLeave(columnElement);

    expect(mockSetCards).not.toHaveBeenCalled();
  });

  it('renders the add card button', () => {
    render(<Column {...columnProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

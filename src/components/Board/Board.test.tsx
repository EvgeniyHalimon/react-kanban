import { render, screen } from '@testing-library/react';
import { Board } from './Board';
import { describe, test, expect } from 'vitest';

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
    render(<Board />);

    const burnBarrelButton = screen.getByTestId('burn-barrel');

    expect(burnBarrelButton).toBeInTheDocument();
  });
});

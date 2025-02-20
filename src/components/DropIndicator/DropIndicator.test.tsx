import { render } from '@testing-library/react';
import { DropIndicator } from './DropIndicator';

describe('DropIndicator', () => {
  it('renders with correct default attributes', () => {
    const { getByTestId } = render(
      <DropIndicator beforeId={null} column="todo" />
    );

    const dropIndicator = getByTestId('drop-indicator');
    expect(dropIndicator).toHaveAttribute('data-before', '-1');
    expect(dropIndicator).toHaveAttribute('data-column', 'todo');
    expect(dropIndicator).toHaveClass(
      'my-0.5 h-0.5 w-full bg-violet-400 opacity-0'
    );
  });

  it('renders with provided beforeId', () => {
    const { getByTestId } = render(
      <DropIndicator beforeId="123" column="doing" />
    );

    const dropIndicator = getByTestId('drop-indicator');
    expect(dropIndicator).toHaveAttribute('data-before', '123');
    expect(dropIndicator).toHaveAttribute('data-column', 'doing');
  });
});

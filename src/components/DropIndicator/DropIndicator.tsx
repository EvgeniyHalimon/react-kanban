type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

export const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || '-1'}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
      data-testid="drop-indicator"
    />
  );
};

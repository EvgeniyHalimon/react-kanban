export type ColumnType = 'backlog' | 'todo' | 'doing' | 'done';

export type CardType = {
  title: string;
  id: string;
  column: ColumnType;
};

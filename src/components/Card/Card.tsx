import { motion } from 'framer-motion';
import { DropIndicator } from '../DropIndicator/DropIndicator';
import { CardType } from '../../types';

type CardProps = CardType & {
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: CardType) => void;
};

export const Card = ({ title, id, column, handleDragStart }: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={e =>
          handleDragStart(e as unknown as React.DragEvent<HTMLDivElement>, {
            title,
            id,
            column,
          })
        }
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </>
  );
};

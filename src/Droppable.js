import { useDrop } from "react-dnd";

export const Droppable = ({ children, onDrop, word }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "draggable",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item, monitor) => {
      onDrop(item.word, word);
    },
  }), [onDrop]);

  return (
    <div
      ref={drop}
      style={{ border: isOver ? "solid 2px rgba(255,255,0,0.4)" : "none" }}
    >
      {children}
    </div>
  );
};

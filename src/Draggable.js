import { useDrag } from "react-dnd";

export const Draggable = ({ children, word }) => {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "draggable",
      item: { word },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  return (
    <div ref={dragRef} style={{ opacity }}>
      {children}
    </div>
  );
};

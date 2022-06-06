import { useDrop, useDrag } from "react-dnd";
import PropTypes from "prop-types";

const BurgerIngredientDragItem = ({
  children,
  uuid,
  findIngredient,
  moveIngredient,
}) => {
  const originalIndex = findIngredient(uuid).index
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "ingredient-sort",
      item: { uuid, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { uuid: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveIngredient(droppedId, originalIndex)
        }
      },
    }),
    [uuid, originalIndex, moveIngredient],
  )
  const [, drop] = useDrop(
    () => ({
      accept: "ingredient-sort",
      hover({ uuid: draggedId }) {
        if (draggedId !== uuid) {
          const { index: overIndex } = findIngredient(uuid)
          moveIngredient(draggedId, overIndex)
        }
      },
    }),
    [findIngredient, moveIngredient],
  )
  const opacity = isDragging ? 0 : 1
  return (
    <div ref={node => drag(drop(node))} style={{ opacity }}>
      {children}
    </div>
  );
};

BurgerIngredientDragItem.propTypes = {
  children: PropTypes.node.isRequired,
  uuid: PropTypes.string.isRequired,
  findIngredient: PropTypes.func.isRequired,
  moveIngredient: PropTypes.func.isRequired,
};

export default BurgerIngredientDragItem;

import { FC } from "react";
import { useDrop, useDrag } from "react-dnd";
import { IIngredient } from "../../types";

const BurgerIngredientDragItem: FC<IBurgerIngredientDragItem> = ({
  children,
  uuid,
  findIngredient,
  moveIngredient,
}) => {
  const originalIndex = findIngredient(uuid).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "ingredient-sort",
      item: { uuid, originalIndex },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { uuid: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveIngredient(droppedId, originalIndex);
        }
      },
    }),
    [uuid, originalIndex, moveIngredient]
  );
  const [, drop] = useDrop(
    () => ({
      accept: "ingredient-sort",
      hover(ingredient: IIngredient) {
        const { uuid: draggedId } = ingredient;
        if (draggedId !== uuid) {
          const { index: overIndex } = findIngredient(uuid);
          moveIngredient(draggedId, overIndex);
        }
      },
    }),
    [findIngredient, moveIngredient]
  );
  const opacity = isDragging ? 0 : 1;
  return (
    <div ref={node => drag(drop(node))} style={{ opacity }}>
      {children}
    </div>
  );
};

interface IBurgerIngredientDragItem {
  children: React.ReactNode;
  uuid: string;
  findIngredient: (uuuid: string) => { ingredient: IIngredient; index: number };
  moveIngredient: (uuid: string, atIndex: number) => void;
}

export default BurgerIngredientDragItem;

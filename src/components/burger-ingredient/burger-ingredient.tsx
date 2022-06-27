import { FC } from 'react';
import classNames from "classnames/bind";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import styles from "./burger-ingredient.module.css";
import { IIngredient } from "../../types";

const BurgerIngredient: FC<IBurgerIngredient> = ({
  ingredient,
  count = 0,
}) => {
  const [{ opacity }, ingredientRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div ref={ingredientRef} style={{ opacity }}>
      {count > 0 && <Counter count={count} size="default" />}
      <img src={ingredient.image} alt={ingredient.name} className="ml-4 mr-4" />
      <div className={classNames(styles.priceWrapper, "mt-1 mb-1")}>
        <span className="text_type_digits-default mr-2">
          {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <span className={classNames(styles.title, "text_type_main-default")}>
        {ingredient.name}
      </span>
    </div>
  );
};

interface IBurgerIngredient {
  ingredient: IIngredient;
  count: number;
}

export default BurgerIngredient;

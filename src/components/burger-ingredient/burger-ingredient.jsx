import classNames from "classnames/bind";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";

const BurgerIngredient = ({ ingredient, count = 0 }) => {
  return (
    <li className={classNames(styles.ingredient, "mb-10")}>
      {count > 0 && <Counter count={count} size="default" className="count" />}
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
    </li>
  );
};

export default BurgerIngredient;

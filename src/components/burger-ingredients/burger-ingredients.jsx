import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import classNames from "classnames/bind";
import styles from "./burger-ingredients.module.css";

const ingredientTypes = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

const Tabs = () => {
  const [current, setCurrent] = useState("bun");
  return (
    <div className={classNames(styles.tabsWrapper, "mb-10")}>
      {Object.keys(ingredientTypes).map(type => (
        <Tab
          key={type}
          value={type}
          active={current === type}
          onClick={setCurrent}
        >
          {ingredientTypes[type]}
        </Tab>
      ))}
    </div>
  );
};

const IngredientBlock = ({ title, ingredients }) => {
  return (
    <>
      <h3 className="text_type_main-medium">{title}</h3>
      <ul className={styles.list}>
        {ingredients.map((ingredient, index) => (
          <BurgerIngredient
            key={ingredient._id}
            ingredient={ingredient}
            count={index === 0 ? 1 : 0}
          />
        ))}
      </ul>
    </>
  );
};

const BurgerIngredients = ({ ingredients }) => {
  const ingredientsByType = ingredients.reduce(
    (acc, ingredient) => {
      if (!acc[ingredient.type]) {
        acc[ingredient.type] = [];
      }
      acc[ingredient.type].push(ingredient);
      return acc;
    },
    { bun: [], sauce: [], main: [] }
  );

  return (
    <div className={classNames(styles.burgerIngredients, "mr-10")}>
      <Tabs />
      <div className={classNames(styles.listWrapper, "custom-scroll")}>
        {Object.keys(ingredientTypes).map(type => (
          <IngredientBlock
            ingredients={ingredientsByType[type]}
            title={ingredientTypes[type]}
          />
        ))}
      </div>
    </div>
  );
};

export default BurgerIngredients;

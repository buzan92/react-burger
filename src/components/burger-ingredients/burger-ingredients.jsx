import PropTypes from "prop-types";
import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import classNames from "classnames/bind";
import styles from "./burger-ingredients.module.css";
import { IngredientType } from "../../prop-types/ingredient";

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

const IngredientBlock = ({ title, ingredients, showIngredient }) => {
  return (
    <>
      <h3 className="text_type_main-medium">{title}</h3>
      <ul className={styles.list}>
        {ingredients.map((ingredient, index) => (
          <li
            key={ingredient._id}
            className={classNames(styles.ingredient, "mb-10")}
            onClick={() => showIngredient(ingredient)}
          >
            <BurgerIngredient
              ingredient={ingredient}
              count={index === 0 ? 1 : 0}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

const BurgerIngredients = ({ ingredients }) => {
  const [isShowIngredient, setIsShowIngredient] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const showIngredient = ingredient => {
    setSelectedIngredient(ingredient);
    setIsShowIngredient(true);
  };

  const closeIngredient = () => {
    setIsShowIngredient(false);
    setSelectedIngredient(null);
  };

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
            key={type}
            ingredients={ingredientsByType[type]}
            title={ingredientTypes[type]}
            showIngredient={showIngredient}
          />
        ))}
      </div>
      <Modal isShow={isShowIngredient} closeModal={closeIngredient}>
        <IngredientDetails ingredient={selectedIngredient} />
      </Modal>
    </div>
  );
};

IngredientBlock.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(IngredientType).isRequired,
  showIngredient: PropTypes.func.isRequired,
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientType).isRequired,
};

export default BurgerIngredients;

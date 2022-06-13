import PropTypes from "prop-types";
import { useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import classNames from "classnames/bind";
import styles from "./burger-ingredients.module.css";
import { IngredientType } from "../../prop-types/ingredient";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  toggleSelectedIngredient,
  setActiveTab,
} from "../../services/actions/ingredients";

const ingredientTypes = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

const Tabs = ({ blocksRef }) => {
  const { activeTab } = useSelector(state => state.ingredients);
  const handleTabClick = type => {
    blocksRef.current[type].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };

  return (
    <div className={classNames(styles.tabsWrapper, "mb-10")}>
      {Object.keys(ingredientTypes).map(type => (
        <Tab
          key={type}
          value={type}
          active={activeTab === type}
          onClick={() => handleTabClick(type)}
        >
          {ingredientTypes[type]}
        </Tab>
      ))}
    </div>
  );
};

const IngredientBlock = ({ title, ingredients, showIngredient }) => {
  const { ingredients: burgerIngredients, bun } = useSelector(
    state => state.construct
  );

  const counts = burgerIngredients.reduce(
    (acc, ingredient) => {
      if (typeof acc[ingredient._id] === "undefined") {
        acc[ingredient._id] = 0;
      }
      acc[ingredient._id] += 1;
      return acc;
    },
    { ...(bun && { [bun._id]: 2 }) }
  );

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
            <Link
              to={{
                pathname: `/ingredients/${ingredient._id}`,
                state: { isModal: true },
              }}
            >
              <BurgerIngredient
                ingredient={ingredient}
                count={counts[ingredient._id] || 0}
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const { ingredients, activeTab } = useSelector(state => state.ingredients);

  const showIngredient = ingredient => {
    dispatch(toggleSelectedIngredient(ingredient));
  };

  const blocksRef = useRef({});
  const blocksOffset = Object.keys(blocksRef.current).reduce((acc, key) => {
    acc[key] = blocksRef.current[key].offsetTop;
    return acc;
  }, {});

  const handleScroll = event => {
    const { scrollTop } = event.target;
    const tab = Object.keys(blocksOffset).reduce((acc, key) => {
      return (acc = scrollTop >= blocksOffset[key] ? key : acc);
    }, "");
    if (tab !== activeTab) {
      dispatch(setActiveTab(tab));
    }
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
      <Tabs blocksRef={blocksRef} />
      <div
        onScroll={handleScroll}
        className={classNames(styles.listWrapper, "custom-scroll")}
      >
        {Object.keys(ingredientTypes).map(type => (
          <div
            ref={el => (blocksRef.current[type] = el)}
            key={type}
            className={classNames(styles.groupWrapper)}
          >
            <IngredientBlock
              ingredients={ingredientsByType[type]}
              title={ingredientTypes[type]}
              showIngredient={showIngredient}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

IngredientBlock.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(IngredientType).isRequired,
  showIngredient: PropTypes.func.isRequired,
};

Tabs.propTypes = {
  blocksRef: PropTypes.shape({
    current: PropTypes.objectOf(PropTypes.instanceOf(Element)),
  }).isRequired,
};

export default BurgerIngredients;

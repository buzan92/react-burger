import { FC, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import classNames from "classnames/bind";
import styles from "./burger-ingredients.module.css";
import { useDispatch, useSelector } from "../../hooks/state";
import { Link } from "react-router-dom";
import {
  toggleSelectedIngredient,
  setActiveTab,
} from "../../services/actions/ingredients";
import { IIngredient } from "../../types";

const ingredientTypes: { [type: string]: string } = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

const Tabs: FC<ITabs> = ({ blocksRef }) => {
  const { activeTab } = useSelector(state => state.ingredients);
  const handleTabClick = (type: string) => {
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

const IngredientBlock: FC<IIngredientBlock> = ({
  title,
  ingredients,
  showIngredient,
}) => {
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
        {ingredients.map(ingredient => (
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

  const showIngredient = (ingredient: IIngredient) => {
    dispatch(toggleSelectedIngredient(ingredient));
  };

  const blocksRef = useRef<{ [key: string]: HTMLDivElement }>({});
  const blocksOffset = Object.keys(blocksRef.current).reduce((acc, key) => {
    acc[key] = blocksRef.current[key].offsetTop;
    return acc;
  }, {} as { [key: string]: number });

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const { scrollTop } = event.currentTarget;
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
    { bun: [], sauce: [], main: [] } as { [type: string]: IIngredient[] }
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
            ref={(el: HTMLDivElement) => (blocksRef.current[type] = el)}
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

interface IIngredientBlock {
  title: string;
  ingredients: IIngredient[];
  showIngredient: (ingredient: IIngredient) => void;
}

interface ITabs {
  blocksRef: {
    current: Record<string, HTMLDivElement>;
  };
}

export default BurgerIngredients;

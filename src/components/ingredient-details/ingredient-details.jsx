import styles from "./ingredient-details.module.css";
import classNames from "classnames/bind";
import { IngredientType } from "../../prop-types/ingredient";
import { useContext } from "react";
import { AppContext } from "../../services/app-context";

const IngredientDetails = ({ ingredient }) => {
  const { dispatch } = useContext(AppContext);

  const { name, image_large, proteins, fat, carbohydrates, calories } =
    ingredient;
  const nutrients = [
    { title: "Калории,ккал", value: calories },
    { title: "Белки, г", value: proteins },
    { title: "Жиры, г", value: fat },
    { title: "Углеводы, г", value: carbohydrates },
  ];

  const addIngredient = ingredient => {
    const type =
      ingredient.type === "bun"
        ? "addConstructorBun"
        : "addConstructorIngredient";
    dispatch({ type, payload: ingredient });
  };

  return (
    <>
      <h1 className={classNames(styles.title, "text_type_main-large mt-3")}>
        Детали ингредиента
      </h1>
      <div className={styles.inner}>
        <img src={image_large} alt={name} className="ml-2 mr-2" />
        <h3 className="text_type_main-medium mt-4 mb-8">{name}</h3>
        <ul className={styles.list}>
          {nutrients.map(({ title, value }, index) => (
            <li key={index} className={styles.item}>
              <span className="mb-2">{title}</span>
              <span className="text_type_digits-default">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

IngredientDetails.propTypes = {
  ingredient: IngredientType,
};

export default IngredientDetails;

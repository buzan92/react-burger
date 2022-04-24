import classNames from "classnames/bind";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

const BurgerConstructor = ({ ingredients }) => {
  const getProps = ingredient => {
    const { price, name, image_mobile } = ingredient;
    return { text: name, price, thumbnail: image_mobile };
  };
  const length = ingredients.length;

  const firstIgredient = {
    ...getProps(ingredients[0]),
    type: "top",
    isLocked: true,
  };
  const lastIngredient = {
    ...getProps(ingredients[length - 1]),
    type: "bottom",
    isLocked: true,
  };
  const remainingIngredients = ingredients.slice(1, length - 1);

  const sum = ingredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );

  return (
    <div className={classNames(styles.burgerConstructor, "ml-10")}>
      <div className={styles.list}>
        <div className={classNames(styles.listItem, "mb-4")}>
          <ConstructorElement {...firstIgredient} />
        </div>
        <ul className={classNames(styles.dragList, "custom-scroll mb-4 pl-3")}>
          {remainingIngredients.map(ingredient => (
            <li className={classNames(styles.listItem, "mb-4")}>
              <div className="mr-4">
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                key={ingredient._id}
                {...getProps(ingredient)}
              />
            </li>
          ))}
        </ul>
        <div className={classNames(styles.listItem, "mb-10")}>
          <ConstructorElement {...lastIngredient} />
        </div>
      </div>
      <div className={styles.cart}>
        <span className="text_type_digits-medium">{sum}</span>
        <div className="ml-4 mr-10">
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;

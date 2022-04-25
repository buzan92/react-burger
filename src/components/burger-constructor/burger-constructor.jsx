import { useState } from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import { IngredientType } from "../../prop-types/ingredient";

const BurgerConstructor = ({ ingredients }) => {
  const [isShowOrder, setIsShowOrder] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const showOrder = () => {
    const orderId = Math.floor(Math.random() * 999999 + 1);
    setOrderId(orderId);
    setIsShowOrder(true);
  };

  const closeOrder = () => {
    setOrderId(null);
    setIsShowOrder(false);
  };

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
            <li
              key={ingredient._id}
              className={classNames(styles.listItem, "mb-4")}
            >
              <div className="mr-4">
                <DragIcon type="primary" />
              </div>
              <ConstructorElement {...getProps(ingredient)} />
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
        <Button onClick={showOrder} type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
      <Modal isShow={isShowOrder} closeModal={closeOrder}>
        <OrderDetails orderId={orderId} />
      </Modal>
    </div>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientType).isRequired,
};

export default BurgerConstructor;

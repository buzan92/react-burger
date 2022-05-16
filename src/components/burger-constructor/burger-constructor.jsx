import { useContext, useEffect } from "react";
import classNames from "classnames/bind";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import { AppContext } from "../../services/app-context";
import { postRequest } from "../../utils/api";

const BurgerConstructor = () => {
  const { state, dispatch } = useContext(AppContext);
  const {
    constructor: { ingredients, bun, sum },
    isShowOrderModal,
  } = state;

  useEffect(() => {
    const ingredientsSum = ingredients.reduce(
      (acc, ingredient) => acc + ingredient.price,
      0
    );
    const bunSum = bun?.price * 2 || 0;

    dispatch({ type: "setConstructorSum", payload: ingredientsSum + bunSum });
  }, [bun, ingredients, dispatch]);

  const showOrder = async () => {
    const ingredientIds = ingredients.map(({ _id }) => _id);
    const res = await postRequest("orders", { ingredients: ingredientIds });
    const payload = res?.order ?? null;
    dispatch({ type: "toggleOrder", payload });
  };

  const closeOrder = () => {
    dispatch({ type: "toggleOrder", payload: null });
  };

  const getProps = ingredient => {
    if (!ingredient) {
      return {};
    }
    const { price, name, image_mobile } = ingredient;
    return { text: name, price, thumbnail: image_mobile };
  };
  const length = ingredients.length;

  const bunTop = {
    ...getProps(bun),
    type: "top",
    isLocked: true,
  };
  const bunBottom = {
    ...bunTop,
    type: "bottom",
  };
  const remainingIngredients = ingredients.slice(1, length);

  return (
    <div className={classNames(styles.burgerConstructor, "ml-10")}>
      <div className={styles.list}>
        <div className={classNames(styles.listItem, "mb-4")}>
          {bun && <ConstructorElement {...bunTop} />}
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
          {bun && <ConstructorElement {...bunBottom} />}
        </div>
      </div>
      <div className={styles.cart}>
        <span className="text_type_digits-medium">{sum}</span>
        <div className="ml-4 mr-10">
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={showOrder}
          disabled={!bun}
          type="primary"
          size="medium"
        >
          Оформить заказ
        </Button>
      </div>
      <Modal isShow={isShowOrderModal} closeModal={closeOrder}>
        <OrderDetails />
      </Modal>
    </div>
  );
};

export default BurgerConstructor;

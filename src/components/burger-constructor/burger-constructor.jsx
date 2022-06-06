import { useEffect, useCallback } from "react";
import classNames from "classnames/bind";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import BurgerIngredientDragItem from "../burger-ingredient/burger-ingredient-drag-item";
import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setSum,
  addIngredient,
  deleteIngredient,
  createOrder,
  toggleOrder,
  sortIngredient,
} from "../../services/actions/constructor";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { ingredients, bun, sum, isShowOrderModal } = useSelector(
    state => state.construct
  );

  useEffect(() => {
    const ingredientsSum = ingredients.reduce(
      (acc, ingredient) => acc + ingredient.price,
      0
    );
    const bunSum = bun?.price * 2 || 0;

    dispatch(setSum(ingredientsSum + bunSum));
  }, [bun, ingredients, dispatch]);

  const [, constructorList] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      dispatch(addIngredient(ingredient));
    },
  });

  const showOrder = async () => {
    const ingredientIds = ingredients.map(({ _id }) => _id);
    ingredientIds.push(...[bun._id, bun._id]);
    dispatch(createOrder(ingredientIds));
  };

  const closeOrder = () => {
    dispatch(toggleOrder(null));
  };

  const getProps = (ingredient, index) => {
    if (!ingredient) {
      return {};
    }
    const { price, name, image_mobile, type } = ingredient;
    return {
      text: name,
      price,
      thumbnail: image_mobile,
      ...(type !== "bon" && {
        handleClose: () => dispatch(deleteIngredient(index)),
      }),
    };
  };

  const bunProps = { ...getProps(bun, 0), isLocked: true };

  const bunTop = { ...bunProps, text: `${bunProps.text} (верх)`, type: "top" };
  const bunBottom = {
    ...bunTop,
    text: `${bunProps.text} (низ)`,
    type: "bottom",
  };

  const [, dragList] = useDrop({ accept: "ingredient-sort" });

  const findIngredient = useCallback(
    uuid => {
      const ingredient = ingredients.filter(i => i.uuid === uuid)[0];
      return {
        ingredient,
        index: ingredients.indexOf(ingredient),
      };
    },
    [ingredients]
  );

  const moveIngredient = useCallback(
    (uuid, atIndex) => {
      const { index } = findIngredient(uuid);
      dispatch(sortIngredient(index, atIndex));
    },
    [findIngredient, dispatch]
  );

  return (
    <div className={classNames(styles.burgerConstructor, "ml-10")}>
      <div ref={constructorList} className={styles.list}>
        <div className={classNames(styles.listItem, "mb-4")}>
          {bun && <ConstructorElement {...bunTop} />}
        </div>
        <ul
          ref={dragList}
          className={classNames(styles.dragList, "custom-scroll mb-4 pl-3")}
        >
          {ingredients.map((ingredient, index) => (
            <BurgerIngredientDragItem
              key={ingredient.uuid}
              uuid={ingredient.uuid}
              findIngredient={findIngredient}
              moveIngredient={moveIngredient}
            >
              <li className={classNames(styles.listItem, "mb-4")}>
                <div className="mr-4">
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement {...getProps(ingredient, index)} />
              </li>
            </BurgerIngredientDragItem>
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

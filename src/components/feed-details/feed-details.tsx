import { FC } from "react";
import { useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames/bind";
import styles from "./feed-details.module.css";
import { useSelector } from "../../hooks/state";
import { IIngredient } from "../../types";
import { formatDate } from "../../utils/utils";

const statusDict: { [status: string]: string } = {
  created: "Создан",
  pending: "Готовится",
  done: "Выполнен",
};

const FeedDetailsIngredient: FC<IFeedDetailsIngredient> = ({ ingredient }) => {
  return (
    <li className={styles.ingredient}>
      <div className={styles.imageWrapper}>
        <div className={styles.imageInner}>
          <img src={ingredient.image_mobile} alt="" className={styles.image} />
        </div>
      </div>
      <span
        className={classNames(styles.ingredientName, "text_type_main-default")}
      >
        {ingredient.name}
      </span>
      <span
        className={classNames(
          styles.ingredientPrice,
          "text_type_digits-default"
        )}
      >
        {ingredient.count} X {ingredient.price} <CurrencyIcon type="primary" />
      </span>
    </li>
  );
};

const FeedDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useSelector(state => state.feed);
  const { ingredients } = useSelector(state => state.ingredients);

  const order = orders.find(order => order._id === id);

  const status = order?.status && statusDict[order.status];
  const orderIngredients = order?.ingredients.reduce(
    (acc: { [id: string]: IIngredient & { count: number } }, id) => {
      if (!acc[id]) {
        const ingredient = ingredients.find(item => item._id === id);
        if (ingredient) {
          acc[id] = { ...ingredient, count: 1 };
        }
      } else {
        acc[id].count += 1;
      }
      return acc;
    },
    {}
  );

  const sum =
    orderIngredients &&
    Object.keys(orderIngredients).reduce((acc, key) => {
      return (acc += orderIngredients[key].price * orderIngredients[key].count);
    }, 0);

  return (
    <div className={styles.feedDetails}>
      <span className="text_type_digits-default text-center">
        #{order?.number}
      </span>
      <h3 className="text_type_main-medium">{order?.name}</h3>
      <span className="text_type_main-default text_color_success">
        {status}
      </span>
      <h4 className="text_type_main-medium">Состав:</h4>
      <ul className={classNames(styles.list, "custom-scroll")}>
        {orderIngredients &&
          Object.keys(orderIngredients).map(key => (
            <FeedDetailsIngredient
              key={key}
              ingredient={orderIngredients[key]}
            />
          ))}
      </ul>
      <div className={styles.footer}>
        <span className="text_type_main-default text_color_inactive">
          {formatDate(order?.createdAt)}
        </span>
        <span className="text_type_digits-default">
          {sum} <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  );
};

interface IFeedDetailsIngredient {
  ingredient: IIngredient & { count: number };
}

export default FeedDetails;

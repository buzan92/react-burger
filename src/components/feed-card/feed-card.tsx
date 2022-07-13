import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IFeedOrder } from "../../types";
import styles from "./feed-card.module.css";
import { formatDate } from "../../utils/utils";
import { useSelector } from "../../hooks/state";

const FeedCard: FC<IFeedCard> = ({ order, showModal }) => {
  const { ingredients } = useSelector(state => state.ingredients);
  const extra = order.ingredients.length - 6;
  const info = order.ingredients.reduce(
    (acc, _id, index) => {
      const findIngredient = ingredients.find(
        ingredient => ingredient._id === _id
      );
      if (findIngredient) {
        if (index < 6) {
          const title = index === 5 && extra > 0 ? `+${extra}` : "";
          acc.images.push({ src: findIngredient.image_mobile, title });
        }
        acc.sum += findIngredient.price;
      }
      return acc;
    },
    { images: [] as { src: string; title: string }[], sum: 0 }
  );

  return (
    <div className={styles.feedCard} onClick={() => showModal(order._id)}>
      <div className={styles.header}>
        <span className="text_type_digits-default">#{order.number}</span>
        <span className="text_type_main-default text_color_inactive">
          {formatDate(order.createdAt)}
        </span>
      </div>
      <span className="text_type_main-medium">{order.name}</span>
      <div className={styles.footer}>
        <ul className={styles.imageList}>
          {info.images.map((image, key) => (
            <li key={key} className={styles.imageListItem}>
              <div className={styles.imageInner}>
                <img src={image.src} alt="" className={styles.image} />
                <span className="text_type_main-default">{image.title}</span>
              </div>
            </li>
          ))}
        </ul>
        <span className="text_type_digits-default">
          {info.sum} <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  );
};

interface IFeedCard {
  order: IFeedOrder;
  showModal: Function;
}

export default FeedCard;

import { FC } from "react";
import { IFeedOrder } from "../../types";
import styles from "./feed-stat.module.css";

const FeedStatCol: FC<IFeedStatCol> = ({ numbers, title }) => {
  const getChunk = (arr: number[]) => {
    return arr.reduce((acc: number[][], item: number, i) => {
      const ch = Math.floor(i / 10);
      acc[ch] = ([] as number[]).concat(acc[ch] || [], item);
      return acc;
    }, []);
  };

  return (
    <>
      {getChunk(numbers).map((list, index) => (
        <div key={index} className={styles.col}>
          <span className="text_type_main-medium">{index === 0 && title}</span>
          <ul className={styles.colList}>
            {list.map(number => (
              <li
                key={number}
                className="text_type_digits-default text_color_success"
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

const FeedStat: FC<IFeedStat> = ({ orders, total, totalToday }) => {
  const filteredOrders = orders.reduce(
    (acc, order) => {
      if (order.status === "done" && acc.done.length < 20) {
        acc.done.push(order.number);
      } else if (order.status === "pending" && acc.pending.length < 20) {
        acc.pending.push(order.number);
      }
      return acc;
    },
    { done: [] as number[], pending: [] as number[] }
  );
  return (
    <div className={styles.feedStat}>
      <div className={styles.colWrapper}>
        <FeedStatCol numbers={filteredOrders.done} title="Готовы:" />
        <FeedStatCol numbers={filteredOrders.pending} title="В работе:" />
      </div>
      <div className={styles.statBlock}>
        <span className="text_type_main-medium">Выполнено за все время:</span>
        <h1 className="text_type_digits-large">{total}</h1>
      </div>
      <div className={styles.statBlock}>
        <span className="text_type_main-medium">Выполнено за сегодня:</span>
        <h1 className="text_type_digits-large">{totalToday}</h1>
      </div>
    </div>
  );
};

interface IFeedStatCol {
  numbers: number[];
  title: string;
}

interface IFeedStat {
  orders: IFeedOrder[];
  total: number;
  totalToday: number;
}

export default FeedStat;

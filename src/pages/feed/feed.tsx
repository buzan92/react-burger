import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "../../hooks/state";
import { useHistory, useLocation } from "react-router-dom";
import {
  wsConnectionStart,
  wsConnectionClose,
} from "../../services/actions/feed";
import styles from "./feed.module.css";
import FeedCard from "../../components/feed-card/feed-card";
import FeedStat from "../../components/feed-stat/feed-stat";
import Modal from "../../components/modal/modal";
import FeedDetails from "../../components/feed-details/feed-details";
import { TLocation } from "../../types";

const FeedPage = () => {
  const [isShowFeedModal, setIsShowFeedModal] = useState(false);
  const { orders, total, totalToday } = useSelector(state => state.feed);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<TLocation>();
  const isModal = location.state?.isModal;

  useEffect(() => {
    dispatch(wsConnectionStart("wss://norma.nomoreparties.space/orders/all"));
    return () => {
      dispatch(wsConnectionClose());
    };
  }, [dispatch]);

  const showFeedModal = (_id: string): void => {
    const pathname = `/feed/${_id}`;
    history.push({ pathname, state: { isModal: true } });
    setIsShowFeedModal(true);
  };

  const closeFeedModal = (): void => {
    history.push({ pathname: "/feed", state: { isModal: false } });
    setIsShowFeedModal(false);
  };

  return (
    <main className={styles.main}>
      <h1 className="text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={styles.content}>
        <div className={classNames(styles.feedList, "custom-scroll")}>
          {orders.map(order => (
            <FeedCard order={order} key={order._id} showModal={showFeedModal} />
          ))}
        </div>
        <FeedStat orders={orders} total={total} totalToday={totalToday} />
      </div>
      <Modal isShow={isModal || isShowFeedModal} closeModal={closeFeedModal}>
        <FeedDetails />
      </Modal>
    </main>
  );
};

export default FeedPage;

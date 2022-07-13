import { useEffect } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "../../hooks/state";
import { useHistory } from "react-router-dom";
import {
  wsConnectionStart,
  wsConnectionClose,
  setShowFeedModal,
} from "../../services/actions/feed";
import styles from "./feed.module.css";
import FeedCard from "../../components/feed-card/feed-card";
import FeedStat from "../../components/feed-stat/feed-stat";
import Modal from "../../components/modal/modal";
import FeedDetails from "../../components/feed-details/feed-details";

const FeedPage = () => {
  const { orders, total, totalToday, isShowFeedModal } = useSelector(
    state => state.feed
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(wsConnectionStart("wss://norma.nomoreparties.space/orders/all"));
    return () => {
      dispatch(wsConnectionClose());
    };
  }, [dispatch]);

  const showFeedModal = (_id: string): void => {
    history.push({ pathname: `/feed/${_id}` });
    dispatch(setShowFeedModal(true));
  };

  const closeFeedModal = (): void => {
    history.push({ pathname: "/feed"  });
    dispatch(setShowFeedModal(false));
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
      <Modal isShow={isShowFeedModal} closeModal={closeFeedModal}>
        <FeedDetails />
      </Modal>
    </main>
  );
};

export default FeedPage;

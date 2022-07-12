import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "../../hooks/state";
import {
  wsConnectionStart,
  wsConnectionClose,
  setShowFeedModal,
} from "../../services/actions/feed";
import styles from "./profile-feed.module.css";
import FeedCard from "../../components/feed-card/feed-card";
import FeedDetails from "../../components/feed-details/feed-details";
import Modal from "../../components/modal/modal";
import Cookies from "js-cookie";

const ProfileFeed = () => {
  const { orders, isShowFeedModal } = useSelector(state => state.feed);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const token = Cookies.get('accessToken')?.split('Bearer ')[1];
    const wsUrl = `wss://norma.nomoreparties.space/orders?token=${token}`;
    dispatch(wsConnectionStart(wsUrl));
    return () => {
      dispatch(wsConnectionClose());
    };
  }, [dispatch]);

  const showFeedModal = (_id: string): void => {
    const pathname = `/profile/orders/${_id}`;
    history.push({ pathname, state: { isModal: true } });
    dispatch(setShowFeedModal(true));
  };

  const closeFeedModal = (): void => {
    history.push({ pathname: "/profile/orders", state: { isModal: false } });
    dispatch(setShowFeedModal(false));
  };

  return (
    <>
      <div className={classNames(styles.feedList, "custom-scroll")}>
        {orders.map(order => (
          <FeedCard order={order} key={order._id} showModal={showFeedModal} />
        ))}
      </div>
      <Modal isShow={isShowFeedModal} closeModal={closeFeedModal}>
        <FeedDetails />
      </Modal>
    </>
  );
};

export default ProfileFeed;

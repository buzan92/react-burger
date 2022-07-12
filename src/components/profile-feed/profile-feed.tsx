import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "../../hooks/state";
import {
  wsConnectionStart,
  wsConnectionClose,
} from "../../services/actions/feed";
import styles from "./profile-feed.module.css";
import FeedCard from "../../components/feed-card/feed-card";
import FeedDetails from "../../components/feed-details/feed-details";
import Modal from "../../components/modal/modal";
import Cookies from "js-cookie";
import { TLocation } from "../../types";

const ProfileFeed = () => {
  const [isShowFeedModal, setIsShowFeedModal] = useState(false);
  const { orders } = useSelector(state => state.feed);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<TLocation>();
  const isModal = location.state?.isModal;

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
    setIsShowFeedModal(true);
  };

  const closeFeedModal = (): void => {
    history.push({ pathname: "/profile/orders", state: { isModal: false } });
    setIsShowFeedModal(false);
  };

  return (
    <>
      <div className={classNames(styles.feedList, "custom-scroll")}>
        {orders.map(order => (
          <FeedCard order={order} key={order._id} showModal={showFeedModal} />
        ))}
      </div>
      <Modal isShow={isModal || isShowFeedModal} closeModal={closeFeedModal}>
        <FeedDetails />
      </Modal>
    </>
  );
};

export default ProfileFeed;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "../../hooks/state";
import FeedDetails from "../../components/feed-details/feed-details";
import { TLocation } from "../../types";
import {
  wsConnectionStart,
  wsConnectionClose,
} from "../../services/actions/feed";
import styles from "./feed-details.module.css";

const FeedDetailsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation<TLocation>();

  const isProfile = location.pathname.includes("/profile/orders/");

  useEffect(() => {
    const token = Cookies.get("accessToken")?.split("Bearer ")[1];
    const wsUrl = isProfile
      ? `wss://norma.nomoreparties.space/orders?token=${token}`
      : "wss://norma.nomoreparties.space/orders/all";
    dispatch(wsConnectionStart(wsUrl));
    return () => {
      dispatch(wsConnectionClose());
    };
  }, [dispatch, isProfile]);

  return (
    <div className={styles.container}>
      <FeedDetails />
    </div>
  );
};

export default FeedDetailsPage;

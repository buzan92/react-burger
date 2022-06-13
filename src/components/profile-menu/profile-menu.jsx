import { NavLink, useLocation, useHistory } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./profile-menu.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../services/actions/user";

const ProfileMenu = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = e => {
    e.preventDefault();
    dispatch(
      logout(isSuccess => {
        if (isSuccess) {
          history.replace({ pathname: "/" });
        }
      })
    );
  };

  const subtitle =
    location.pathname === "/profile"
      ? "В этом разделе вы можете изменить свои персональные данные"
      : "";

  return (
    <nav className={styles.profileMenu}>
      <NavLink
        to="/profile"
        exact
        activeClassName={styles.active}
        className={styles.profileMenuLink}
      >
        <span className="text_type_main-medium">Профиль</span>
      </NavLink>
      <NavLink
        to="/profile/orders"
        exact
        activeClassName={styles.active}
        className={styles.profileMenuLink}
      >
        <span className="text_type_main-medium">История заказов</span>
      </NavLink>
      <span
        className={classNames(
          styles.profileMenuLink,
          "text_type_main-medium mb-20"
        )}
        onClick={onLogout}
      >
        Выход
      </span>
      <span className="text_color_inactive text_type_main-default">
        {subtitle}
      </span>
    </nav>
  );
};

export default ProfileMenu;

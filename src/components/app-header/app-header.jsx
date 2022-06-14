import PropTypes from "prop-types";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./app-header.module.css";

const MenuItem = ({ title, icon, to, exact, isActive }) => {
  const Icon = icon;

  return (
    <NavLink
      to={to}
      exact={exact}
      isActive={isActive}
      activeClassName={styles.active}
      className={classNames(styles.menuItem, "pt-4 pb-4 pl-5 pr-5")}
    >
      <Icon type="primary" />
      <span className="ml-2 text_type_main-default">{title}</span>
    </NavLink>
  );
};

const AppHeader = () => {
  const location = useLocation();
  const isHomeActive = () => {
    return location.pathname === '/' || location.state?.isModal;
  };

  return (
    <header className={classNames(styles.header, "pt-4 pb-4")}>
      <nav className={styles.headerInner}>
        <div className={styles.menuList}>
          <MenuItem
            title="Конструктор"
            icon={BurgerIcon}
            to="/"
            isActive={isHomeActive}
          />
          <MenuItem
            title="Лента заказов"
            icon={ListIcon}
            to="/feed"
            exact={true}
          />
        </div>
        <Link to="/" className={styles.logoWrapper}>
          <Logo className="logo" />
        </Link>
        <div className={styles.menuList}>
          <MenuItem title="Личный кабинет" icon={ProfileIcon} to="/profile" />
        </div>
      </nav>
    </header>
  );
};

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  isActive: PropTypes.func,
};

export default AppHeader;

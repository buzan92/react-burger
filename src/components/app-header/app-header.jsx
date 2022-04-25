import PropTypes from "prop-types";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames/bind";
import styles from "./app-header.module.css";

const MenuItem = ({ title, Icon, active }) => {
  return (
    <li
      className={classNames(
        styles.menuItem,
        { [styles.active]: active },
        "pt-4 pb-4 pl-5 pr-5"
      )}
    >
      <Icon type="primary" />
      <span className="ml-2 text_type_main-default">{title}</span>
    </li>
  );
};

const AppHeader = () => {
  return (
    <header className={classNames(styles.header, "pt-4 pb-4")}>
      <nav className={styles.headerInner}>
        <ul className={styles.menuList}>
          <MenuItem title="Конструктор" Icon={BurgerIcon} active />
          <MenuItem title="Лента заказов" Icon={ListIcon} />
        </ul>
        <Logo />
        <ul className={styles.menuList}>
          <MenuItem title="Лента заказов" Icon={ProfileIcon} />
        </ul>
      </nav>
    </header>
  );
};

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  active: PropTypes.bool,
};

export default AppHeader;

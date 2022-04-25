import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./order-details.module.css";
import doneImage from "../../images/done.png";

const OrderDetails = ({ orderId }) => {
  const formattedId = String(orderId).padStart(6, "0");

  return (
    <div className={classNames(styles.order, "mb-15")}>
      <h1 className={classNames(styles.title, "text_type_digits-large mb-8")}>
        {formattedId}
      </h1>
      <h3 className=".text_type_main-medium mb-15">идентификатор заказа</h3>
      <img
        src={doneImage}
        width={120}
        height={120}
        alt="done"
        className="mb-15"
      />
      <span className="mb-2">Ваш заказ начали готовить</span>
      <span className={styles.subtitle}>
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};

OrderDetails.propTypes = {
  orderId: PropTypes.number,
};

export default OrderDetails;

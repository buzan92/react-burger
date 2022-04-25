import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames/bind";
import ModalOverlay from "./modal-overlay";
import styles from "./modal.module.css";

const Modal = ({ isShow, closeModal, children }) => {
  const handleKeyDown = event => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    if (isShow) {
      document.body.classList.add("modal-fixed");
    }
    return () => {
      document.body.classList.remove("modal-fixed");
    };
  }, [isShow]);

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    isShow &&
    ReactDOM.createPortal(
      <>
        <div className={classNames(styles.modal, "pl-10 pt-10 pr-10 pb-15")}>
          <button className={styles.closeButton} onClick={closeModal}>
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
        <ModalOverlay closeModal={closeModal} />
      </>,
      document.getElementById("modal")
    )
  );
};

Modal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;

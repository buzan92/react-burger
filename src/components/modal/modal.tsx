import ReactDOM from "react-dom";
import { FC, useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames/bind";
import ModalOverlay from "./modal-overlay";
import styles from "./modal.module.css";

const Modal: FC<IModal> = ({ isShow, closeModal, children }) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    if (isShow) {
      document.body.classList.add("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isShow]);

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isShow
    ? ReactDOM.createPortal(
        <>
          <div className={classNames(styles.modal, "pl-10 pt-10 pr-10 pb-15")}>
            <button className={styles.closeButton} onClick={closeModal}>
              <CloseIcon type="primary" />
            </button>
            {children}
          </div>
          <ModalOverlay closeModal={closeModal} />
        </>,
        document.getElementById("modal") as HTMLElement
      )
    : null;
};

interface IModal {
  isShow: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

export default Modal;

import { FC } from "react";
import styles from "./modal-overlay.module.css";

const ModalOverlay: FC<IModalOverlay> = ({ closeModal }) => {
  return <div onClick={closeModal} className={styles.overlay} />;
};

interface IModalOverlay {
  closeModal: () => void;
}

export default ModalOverlay;

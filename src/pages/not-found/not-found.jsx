import styles from "./not-found.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <h1 className="text_type_digits-large mb-6">404</h1>
      <h3 className="text_type_main-large">Page not found</h3>
    </div>
  );
};

export default NotFoundPage;

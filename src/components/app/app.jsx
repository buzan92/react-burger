import { useEffect, useState, useCallback } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";

import { getData } from "../../utils/api";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const getIngredients = useCallback(async () => {
    const res = await getData("ingredients");
    if (res && res.success) {
      setData(res.data);
    } else {
      setError(true);
    }
  }, []);

  useEffect(() => {
    getIngredients();
  }, []);

  const title = "Соберите бургер";

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {error ? (
          <h1 className="text_type_main-large mt-10">Что-то пошло не так (=</h1>
        ) : (
          <>
            <h1 className="text_type_main-large mt-10 mb-5">{title}</h1>
            {data.length > 0 && (
              <div className={styles.content}>
                <BurgerIngredients ingredients={data} />
                <BurgerConstructor ingredients={data} />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";

import { data } from "../../utils/data";

function App() {
  const title = "Соберите бургер";

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <h1 className="text_type_main-large mt-10 mb-5">{title}</h1>
        <div className={styles.content}>
          <BurgerIngredients ingredients={data} />
          <BurgerConstructor ingredients={data} />
        </div>
      </main>
    </div>
  );
}

export default App;

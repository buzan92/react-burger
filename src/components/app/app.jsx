import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import { getIngredients } from "../../services/actions/ingredients";

function App() {
  const dispatch = useDispatch();
  const { ingredients, appError } = useSelector(state => state.ingredients);

  const getIngredientsWithCallback = useCallback(() => {
    return dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    getIngredientsWithCallback();
  }, []);

  const title = "Соберите бургер";

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {appError ? (
          <h1 className="text_type_main-large mt-10">Что-то пошло не так (=</h1>
        ) : (
          <>
            <h1 className="text_type_main-large mt-10 mb-5">{title}</h1>
            <DndProvider backend={HTML5Backend}>
              {ingredients.length > 0 && (
                <div className={styles.content}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </div>
              )}
            </DndProvider>
          </>
        )}
      </main>
    </div>
  );
}

export default App;

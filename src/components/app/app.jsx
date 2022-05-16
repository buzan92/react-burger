import { useEffect, useReducer, useCallback } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import { AppContext, appReducer } from "../../services/app-context";

import { getRequest } from "../../utils/api";

const initialState = {
  ingredients: [],
  appError: false,
  selectedIngredient: null,
  isShowIngredientModal: false,
  isShowOrderModal: false,
  order: null,

  constructor: {
    bun: null,
    ingredients: [],
    sum: 0,
  },
};

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { appError, ingredients } = state;

  const getIngredients = useCallback(async () => {
    const res = await getRequest("ingredients");
    const payload =
      res && res.success
        ? { field: "ingredients", value: res.data }
        : { field: "appError", value: true };
    dispatch({ type: "setAppField", payload });
  }, []);

  useEffect(() => {
    getIngredients();
  }, []);

  const title = "Соберите бургер";

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.main}>
          {appError ? (
            <h1 className="text_type_main-large mt-10">
              Что-то пошло не так (=
            </h1>
          ) : (
            <>
              <h1 className="text_type_main-large mt-10 mb-5">{title}</h1>
              {ingredients.length > 0 && (
                <div className={styles.content}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default App;

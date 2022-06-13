import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import styles from "./home.module.css";

const HomePage = () => {
  const { ingredients, appError } = useSelector(state => state.ingredients);

  

  const title = "Соберите бургер";

  return (
    <div>
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

export default HomePage;
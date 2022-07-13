import { useParams } from "react-router-dom";
import { useSelector } from "../../hooks/state";
import styles from "./ingredient-details.module.css";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { IIngredient } from "../../types";

const IngredientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { ingredients } = useSelector(state => state.ingredients);
  const ingredient = ingredients.find(({ _id }) => _id === id) as IIngredient;

  return (
    <div className={styles.container}>
      {ingredients.length > 0 && <IngredientDetails ingredient={ingredient} />}
    </div>
  );
};

export default IngredientDetailsPage;

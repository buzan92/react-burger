import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./ingredient-details.module.css";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

const IngredientDetailsPage = () => {
  const { id } = useParams();
  const { ingredients } = useSelector(state => state.ingredients);
  const ingredient = ingredients.find(({ _id }) => _id === id);

  return (
    <div className={styles.container}>
      {ingredients.length > 0 && <IngredientDetails ingredient={ingredient} />}
    </div>
  );
};

export default IngredientDetailsPage;

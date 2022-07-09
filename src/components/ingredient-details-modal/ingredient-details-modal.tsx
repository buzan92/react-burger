import { useDispatch, useSelector } from "../../hooks/state";
import { useHistory, useParams } from "react-router-dom";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { toggleSelectedIngredient } from "../../services/actions/ingredients";
import { IIngredient } from "../../types";

const IngredientDetailsModal = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { ingredients } = useSelector(state => state.ingredients);
  const ingredient = ingredients.find(({ _id }) => _id === id) as IIngredient;

  const closeIngredient = () => {
    dispatch(toggleSelectedIngredient(null));
    history.push({ pathname: "/", state: { isModal: false } });
  };

  return (
    <Modal isShow={true} closeModal={closeIngredient}>
      <IngredientDetails ingredient={ingredient} />
    </Modal>
  );
};

export default IngredientDetailsModal;

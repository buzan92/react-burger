import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { toggleSelectedIngredient } from "../../services/actions/ingredients";

const IngredientDetailsModal = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { ingredients } = useSelector(state => state.ingredients);
  const ingredient = ingredients.find(({ _id }) => _id === id);

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

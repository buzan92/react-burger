import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../services/actions/user";
import Loader from "../../components/loader/loader";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { isLoading } = useSelector(state => state.user);
  const [form, setForm] = useState({ email: "" });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(
      forgotPassword(form, isSuccess => {
        if (isSuccess) {
          history.push({ pathname: "/reset-password", from: location });
        }
      })
    );
  };

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container mt-45">
      <h3 className="mb-6 text_type_main-medium">Восстановление пароля</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <EmailInput value={form.email} name="email" onChange={onChange} />
        </div>
        <div className="mb-20">
          <Button type="primary" size="medium">
            {isLoading ? <Loader /> : "Восстановить"}
          </Button>
        </div>
        <div className="text_type_main-default mb-4">
          <span className="text_color_inactive mr-2">Вспомнили пароль?</span>
          <Link to="/login" className="text_color_accent">
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
};
export default ForgotPasswordPage;

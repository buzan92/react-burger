import { useState } from "react";
import { Link, useHistory, useLocation, Redirect } from "react-router-dom";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../hooks/state";
import { resetPassword } from "../../services/actions/user";
import Loader from "../../components/loader/loader";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory<{ from: string }>();
  const location = useLocation<{ from: Location }>();
  const { isLoading, isLoggedIn } = useSelector(state => state.user);
  const [form, setForm] = useState({ password: "", token: "" });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      resetPassword(form, (isSuccess: boolean) => {
        if (isSuccess) {
          history.replace({ pathname: "/login" });
        }
      })
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (isLoggedIn) {
    return <Redirect to={history.location.state?.from || "/"} />;
  }

  if (location?.state?.from?.pathname !== "/forgot-password") {
    return <Redirect to={"/forgot-password"} />;
  }

  return (
    <div className="form-container mt-45">
      <h3 className="mb-6 text_type_main-medium">Восстановление пароля</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <PasswordInput
            value={form.password}
            name="password"
            onChange={onChange}
          />
        </div>
        <div className="mb-6">
          <Input
            value={form.token}
            name="token"
            placeholder="Введите код из письма"
            onChange={onChange}
          />
        </div>
        <div className="mb-20">
          <Button type="primary" size="medium">
            {isLoading ? <Loader /> : "Сохранить"}
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
export default ResetPasswordPage;

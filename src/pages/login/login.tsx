import { useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import {
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../hooks/state";
import { login } from "../../services/actions/user";
import Loader from "../../components/loader/loader";

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory<{ from: string }>();
  const { isLoading, isLoggedIn } = useSelector(state => state.user);
  const [form, setForm] = useState({ email: "", password: "" });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      login(form, (isSuccess: boolean) => {
        if (isSuccess) {
          history.replace({ pathname: "/" });
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

  return (
    <div className="form-container mt-45">
      <h3 className="mb-6 text_type_main-medium">Вход</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <EmailInput value={form.email} name="email" onChange={onChange} />
        </div>
        <div className="mb-6">
          <PasswordInput
            value={form.password}
            name="password"
            onChange={onChange}
          />
        </div>
        <div className="mb-20">
          <Button type="primary" size="medium">
            {isLoading ? <Loader /> : "Войти"}
          </Button>
        </div>
        <div className="text_type_main-default mb-4">
          <span className="text_color_inactive mr-2">
            Вы — новый пользователь?
          </span>
          <Link to="/register" className="text_color_accent">
            Зарегистрироваться
          </Link>
        </div>
        <div className="text_type_main-default">
          <span className="text_color_inactive mr-2">Забыли пароль?</span>
          <Link to="/forgot-password" className="text_color_accent">
            Восстановить пароль
          </Link>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;

import { useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import {
  Button,
  Input,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../services/actions/user";
import Loader from "../../components/loader/loader";
import { IState } from "../../types";

const RegisterPage = () => {
  const dispatch: any = useDispatch();
  const history = useHistory<{ from: string }>();
  const { isLoading, isLoggedIn } = useSelector((state: IState) => state.user);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      register(form, (isSuccess: boolean) => {
        if (isSuccess) {
          history.replace({ pathname: "/reset-password" });
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
      <h3 className="mb-6 text_type_main-medium">Регистрация</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <Input
            value={form.name}
            name="name"
            placeholder="Имя"
            onChange={onChange}
          />
        </div>
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
            {isLoading ? <Loader /> : "Зарегистрироваться"}
          </Button>
        </div>
        <div className="text_type_main-default mb-4">
          <span className="text_color_inactive mr-2">
            Уже зарегистрированы?
          </span>
          <Link to="/login" className="text_color_accent">
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
};
export default RegisterPage;

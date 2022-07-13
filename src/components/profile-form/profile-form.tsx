import { useState, useEffect } from "react";
import {
  Button,
  Input,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../hooks/state";
import { getUser, updateUser } from "../../services/actions/user";
import Loader from "../../components/loader/loader";
import { TResponse, IUserResponse } from "../../types";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector(state => state.user);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    dispatch(
      getUser((res: TResponse<IUserResponse>) => {
        if (res.success) {
          const { name, email } = res.user;
          setForm({ ...form, name, email });
        }
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = () => {
    dispatch(updateUser(form));
  };

  const cancelEdit = () => {
    setForm({ ...user!, password: "" });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isDirty =
    user?.name !== form.name ||
    user?.email !== form.email ||
    form.password !== "";

  return (
    <div className="form-container">
      <form>
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
        {user !== null && isDirty && (
          <div className="mb-20">
            <Button type="secondary" size="medium" onClick={cancelEdit}>
              Отмена
            </Button>
            <span className="mr-2" />
            <Button type="primary" size="medium" onClick={onSubmit}>
              {isLoading ? <Loader /> : "Сохранить"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};
export default ProfileForm;

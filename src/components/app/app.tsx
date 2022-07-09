import { Route, Switch, useLocation } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { getIngredients } from "../../services/actions/ingredients";
import { autoLogin } from "../../services/actions/user";
import AppHeader from "../app-header/app-header";
import HomePage from "../../pages/home/home";
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import NotFoundPage from "../../pages/not-found/not-found";
import ProfilePage from "../../pages/profile/profile";
import IngredientDetailsPage from "../../pages/ingredient-details/ingredient-details";
import IngredientDetailsModal from "../ingredient-details-modal/ingredient-details-modal";
import ProtectedRoute from "../protected-route/protected-route";
import Loader from "../loader/loader";
import { TLocation } from "../../types/";
import { useDispatch, useSelector } from "../../hooks/state";

const App = () => {
  const { isAppLoaded } = useSelector((state) => state.ingredients);
  const location = useLocation<TLocation>();
  const dispatch = useDispatch();

  const initApp = useCallback(async () => {
    await dispatch(autoLogin());
    await dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  const isModal = location.state?.isModal;

  return (
    <>
      <AppHeader />
      {isAppLoaded ? (
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/forgot-password" component={ForgotPasswordPage} />
          <Route exact path="/reset-password" component={ResetPasswordPage} />
          <Route exact path="/ingredients/:id">
            {isModal ? (
              <>
                <HomePage />
                <IngredientDetailsModal />
              </>
            ) : (
              <IngredientDetailsPage />
            )}
          </Route>
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <Route component={NotFoundPage} />
        </Switch>
      ) : <div className="mt-45"><Loader /></div>}
    </>
  );
};

export default App;

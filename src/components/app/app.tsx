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
import FeedPage from "../../pages/feed/feed";
import FeedDetailsPage from "../../pages/feed-details/feed-details";
import IngredientDetailsPage from "../../pages/ingredient-details/ingredient-details";
import IngredientDetailsModal from "../ingredient-details-modal/ingredient-details-modal";
import ProtectedRoute from "../protected-route/protected-route";
import Loader from "../loader/loader";
import { TLocation } from "../../types/";
import { useDispatch, useSelector } from "../../hooks/state";

const App = () => {
  const { isAppLoaded } = useSelector(state => state.ingredients);
  const { isShowFeedModal } = useSelector(state => state.feed);
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
          <Route exact path="/feed" component={FeedPage} />
          <Route
            exact
            path="/feed/:id"
            component={isShowFeedModal ? FeedPage : FeedDetailsPage}
          />
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
            {!isShowFeedModal && (
              <Route
                exact
                path="/profile/orders/:id"
                component={FeedDetailsPage}
              />
            )}
          </ProtectedRoute>
          <Route component={NotFoundPage} />
        </Switch>
      ) : (
        <div className="mt-45">
          <Loader />
        </div>
      )}
    </>
  );
};

export default App;

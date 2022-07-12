import { Route, Switch, useLocation, matchPath } from "react-router-dom";
import ProfileMenu from "../../components/profile-menu/profile-menu";
import ProfileForm from "../../components/profile-form/profile-form";
import ProfileFeed from "../../components/profile-feed/profile-feed";
import styles from "./profile.module.css";
import { TLocation } from "../../types/";

const ProfilePage = () => {
  const location = useLocation<TLocation>();
  const isModal = location.state?.isModal;
  const isProfileOrder = matchPath(location.pathname, {
    path: "/profile/orders/:id",
    exact: true,
  });

  return (
    <div className={styles.profileContainer}>
      {(isModal || !isProfileOrder) && <ProfileMenu />}
      <div className="w-100">
        <Switch>
          <Route exact path="/profile" component={ProfileForm} />
          <Route exact path="/profile/orders" component={ProfileFeed} />
          {isModal && (
            <Route exact path="/profile/orders/:id" component={ProfileFeed} />
          )}
        </Switch>
      </div>
    </div>
  );
};

export default ProfilePage;

import { Route, Switch, useLocation, matchPath } from "react-router-dom";
import { useSelector } from "../../hooks/state";
import ProfileMenu from "../../components/profile-menu/profile-menu";
import ProfileForm from "../../components/profile-form/profile-form";
import ProfileFeed from "../../components/profile-feed/profile-feed";
import styles from "./profile.module.css";
import { TLocation } from "../../types/";

const ProfilePage = () => {
  const { isShowFeedModal } = useSelector(state => state.feed);
  const location = useLocation<TLocation>();
  const isProfileOrder = matchPath(location.pathname, {
    path: "/profile/orders/:id",
    exact: true,
  });

  return (
    <div className={styles.profileContainer}>
      {(isShowFeedModal || !isProfileOrder) && <ProfileMenu />}
      <div className="w-100">
        <Switch>
          <Route exact path="/profile" component={ProfileForm} />
          <Route exact path="/profile/orders" component={ProfileFeed} />
          {isShowFeedModal && (
            <Route exact path="/profile/orders/:id" component={ProfileFeed} />
          )}
        </Switch>
      </div>
    </div>
  );
};

export default ProfilePage;

import { Route, Switch } from "react-router-dom";
import ProfileMenu from "../../components/profile-menu/profile-menu";
import ProfileForm from "../../components/profile-form/profile-form";
import styles from "./profile.module.css";

const ProfilePage = () => {
  return (
    <div className={styles.profileContainer}>
      <ProfileMenu />
      <div className="w-100">
        <Switch>
          <Route exact path="/profile" component={ProfileForm} />
          <Route exact path="/profile/orders">
            <h3 className="mb-6 text_type_main-medium">История заказов</h3>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default ProfilePage;

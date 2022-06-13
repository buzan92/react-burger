import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const ProtectedRoute = ({ path, children }) => {
  const isAuth = Cookies.get("refreshToken");
  return (
    <Route
      path={path}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location,
              },
            }}
          />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

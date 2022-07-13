import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "../../hooks/state";
import { FC } from "react";

const ProtectedRoute: FC<RouteProps> = ({ path, children }) => {
  const { isLoggedIn } = useSelector(state => state.user);

  return (
    <Route
      path={path}
      render={({ location }) =>
        isLoggedIn ? (
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

export default ProtectedRoute;

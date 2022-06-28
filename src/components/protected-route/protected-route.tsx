import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC } from "react";
import { IState } from "../../types";

const ProtectedRoute: FC<RouteProps> = ({ path, children }) => {
  const { isLoggedIn } = useSelector((state: IState) => state.user);

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

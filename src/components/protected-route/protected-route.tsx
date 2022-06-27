import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC } from "react";
import { IState } from "../../types";

const ProtectedRoute: FC<IProtectedRoute> = ({ path, children }) => {
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

interface IProtectedRoute {
  path: string;
  children: React.ReactNode;
}

export default ProtectedRoute;

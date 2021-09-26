import { ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RoleType } from 'constants/roles';
import { RootState } from 'reducers';
import { ROUTES } from 'constants/routes';
import ErrorPage from 'pages/Error';

interface IProps {
  children: ReactNode;
  roles: RoleType[];
  path: string;
  exact?: boolean;
}

const PrivateRoute = ({ children, roles, ...props }: IProps) => {
  const { token, role } = useSelector((state: RootState) => state.auth);

  return (
    <Route
      {...props}
      render={({ location }) =>
        token ? (
          roles.includes(role) ? (
            children
          ) : (
            <ErrorPage code={403} />
          )
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.LOGIN,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

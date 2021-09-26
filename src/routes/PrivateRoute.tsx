import { ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RoleType } from 'constants/roles';
import { RootState } from 'reducers';
import { ROUTES } from 'constants/routes';

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
            <span>asd</span>
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

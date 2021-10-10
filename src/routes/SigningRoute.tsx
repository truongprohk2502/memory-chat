import { ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { ROUTES } from 'constants/routes';

interface IProps {
  children: ReactNode;
  path: string;
  exact?: boolean;
}

const SigningRoute = ({ children, ...props }: IProps) => {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <Route
      {...props}
      render={({ location }) =>
        token ? (
          <Redirect
            to={{
              pathname: ROUTES.HOMEPAGE,
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default SigningRoute;

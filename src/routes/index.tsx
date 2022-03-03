import { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { ROUTES } from 'constants/routes';
import { Spinner } from 'components/Spinner';
import SigningRoute from './SigningRoute';

const LoginPage = lazy(() => import('pages/Login'));
const RegistrationPage = lazy(() => import('pages/Registration'));
const Homepage = lazy(() => import('pages/Homepage'));
const ManageUser = lazy(() => import('pages/ManageUser'));
const ErrorPage = lazy(() => import('pages/Error'));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="fixed inset-0 flex justify-center items-center bg-transparent">
            <Spinner className="text-2xl text-black dark:text-white" />
          </div>
        }
      >
        <Switch>
          <PrivateRoute roles={['user', 'admin']} exact path={ROUTES.HOMEPAGE}>
            <Homepage />
          </PrivateRoute>
          <PrivateRoute roles={['admin']} exact path={ROUTES.MANAGE_USER}>
            <ManageUser />
          </PrivateRoute>
          <SigningRoute exact path={ROUTES.LOGIN}>
            <LoginPage />
          </SigningRoute>
          <SigningRoute exact path={ROUTES.REGISTRATION}>
            <RegistrationPage />
          </SigningRoute>
          <Route path="*">
            <ErrorPage code={404} />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;

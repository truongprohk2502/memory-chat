import { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { ROUTES } from 'constants/routes';
import { Spinner } from 'components/Spinner';

const LoginPage = lazy(() => import('pages/Login'));
const Homepage = lazy(() => import('pages/Homepage'));
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
          <PrivateRoute roles={['user']} exact path={ROUTES.HOMEPAGE}>
            <Homepage />
          </PrivateRoute>
          <Route exact path={ROUTES.LOGIN}>
            <LoginPage />
          </Route>
          <Route path="*">
            <ErrorPage code={404} />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;

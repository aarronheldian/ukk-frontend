import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Main from './layout/Main';
import theme from './styles/theme';
import pages from './pages';
import { ROUTES } from './configs';
import appRoute from './configs/appRoute';
import { checkStrictPath, getPathRedirect } from './utils/common';
import { getToken, getUserData } from './utils/storage';

const App = ({ store, history }) => {
  const renderApp = () => {
    const { role } = getUserData() || {};
    
    const handleFacing = () => {
      history.push(getPathRedirect());
    }
    
    if (!getToken() && checkStrictPath()) {
      return <Redirect to={ROUTES.LOGIN} />;
    } else if (!getToken()) {
      return null;
    }
    
    return (
      <Main>
        <Switch>
          <Route exact path={ROUTES.HOME} render={handleFacing} />
          {appRoute.filter(({ apps }) => {
            return apps.includes(role)
          }).map(({ exact, path, name }) => {
            const props = { exact, path, component: pages[name] };
            return <Route {...props} key={name} />;
          })}
          <Route component={pages.Error404} />
        </Switch>
      </Main>
    )
  };
  
  const renderAuth = () => {
    if (getToken() && !checkStrictPath()) {
      return <Redirect to={getPathRedirect()} />;
    } else if (getToken()) {
      return null;
    }
    
    return (
      <Switch>
      <Route exact component={pages.Login} path={ROUTES.LOGIN} />
      <Route exact component={pages.Register} path={ROUTES.REGISTER} />
    </Switch>    
  )};

  return (
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <BrowserRouter>
            {renderApp()}
            {renderAuth()}
          </BrowserRouter>
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;

App.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

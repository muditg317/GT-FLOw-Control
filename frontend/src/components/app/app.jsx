import React, { useContext, useCallback, useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import jwt_decode from 'jwt-decode';
import { setAuthToken, isDev } from 'utils/Utils';
import { setCurrentUserAction, logoutUserAction } from 'state-management/actions/authActions';

import { store } from 'state-management';

import AppHeader from './app-header';
import AppFooter from './app-footer';

import AuthModal from 'components/authModal';
import Landing from 'components/landing';
import About from 'components/about';

import PrivateRoute from 'components/private-route/PrivateRoute';
import Dashboard from 'components/dashboard/dashboard';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);


export default function App(props) {
  const { state, dispatch } = useContext(store);
  if (isDev()) {
    window.dispatch = dispatch;
  }
  const setCurrentUser = useCallback((...args) => setCurrentUserAction(dispatch)(...args), [dispatch]);
  const logoutUser = useCallback((...args) => logoutUserAction(dispatch)(...args), [dispatch]);
  const [ registered, setRegistered ] = useState(true);
  const [ showAuthModal, setShowAuthModal ] = useState(false);

  useEffect(() => {
    // Check for token to keep user logged in
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;  // Set auth token header auth
      setAuthToken(token);
      const decoded = jwt_decode(token);  // Decode token and get user info and exp
      setCurrentUser(decoded);  // Set user and isAuthenticated

      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        logoutUser();  // Logout user
        setShowAuthModal(true);
      }
    }
  }, [dispatch, setCurrentUser, logoutUser, setShowAuthModal]);

  const onAuthButtonPress = useCallback(event => {
    if (state.auth.isAuthenticated) {
      logoutUser();
    } else {
      setShowAuthModal(true);
    }
  }, [state, logoutUser]);

  const openAuthModal = (isRegistered) => {
    setRegistered(isRegistered);
    setShowAuthModal(true);
  }

  return (
    <BrowserRouter basename='/'>
      <div className='h-full flex flex-col' id='app'>
        <Helmet>
          <title>GT FLOw Control</title>
        </Helmet>
        <AppHeader {...{onAuthButtonPress}} />
        <main className='flex-grow'>
          <Switch>
            <Route path='/about'>
              <About />
            </Route>
            <Route exact path={['/', '/landing']}>
              <Landing {...{openAuthModal}} />
            </Route>
            <PrivateRoute exact path='/dashboard'>
              <Dashboard />
            </PrivateRoute>
            <Route path='/'>
              <Redirect to='/' />
            </Route>
          </Switch>
        </main>
        <AuthModal {...{shown: showAuthModal, registered}} onExit={() => setShowAuthModal(false)}/>
        <AppFooter />
      </div>
    </BrowserRouter>
  );
}

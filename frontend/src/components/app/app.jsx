import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Helmet } from 'react-helmet';
import './app.scss';
import './universal.scss';

import AppHeader from './app-header';
import AppFooter from './app-footer';
import Main from 'components/main';
import About from 'components/about';

import { Utils } from 'utils';

export default function App(props) {
  useEffect(() => {
    Utils.addMobileClasses();
  }, []);
  return (
      <BrowserRouter basename='/'>
        <React.StrictMode>
          <div className="app" id="app">
            <Helmet>
              <title>GT FLOw Control</title>
            </Helmet>
            <AppHeader />
            <main className="app-content">
              <Switch>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/">
                  <Main />
                </Route>
              </Switch>
            </main>
            <AppFooter />
          </div>
        </React.StrictMode>
      </BrowserRouter>
    );
}

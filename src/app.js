import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';

import { SessionProvider } from './contexts/session';

import './app.css';
import Home from './pages/home';
import About from './pages/about';

// While the blocklet is deploy to a sub path, this will be work properly.
const apiPrefix = window?.blocklet?.prefix || '/';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/home" component={Home} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

const WrappedApp = withRouter(App);

export default () => {
  return (
    <SessionProvider serviceHost={apiPrefix}>
      <Router basename={apiPrefix}>
        <WrappedApp />
      </Router>
    </SessionProvider>
  );
};

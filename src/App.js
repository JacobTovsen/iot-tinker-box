import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserDashboard from './components/UserDashboard/UserDashboard';
import DeviceOverview from './components/DeviceOverview/DeviceOverview';
import NewDevice from './components/NewDevice/NewDevice';
import Data from './components/Data/Data';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Project Base" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/dashboard"
          component={UserDashboard}
        />
        <Route
          path="/device"
          component={DeviceOverview}
        />
        <Route
          path="/newDevice"
          component={NewDevice}
        />
        <Route
          path="/data"
          component={Data}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;

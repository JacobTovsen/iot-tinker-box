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
import Graphs from './components/Graphs/Graphs';
import EditModal from './components/EditModal/EditModal';
import Tech from './components/Tech/Tech';

import './styles/main.css';

const App = () => (
  <div>
    <Header/>
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
        <Route
          path="/graphs"
          component={Graphs}
        />
        <Route
          path="/editModal"
          component={EditModal}
        />
         <Route
          path="/tech"
          component={Tech}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;

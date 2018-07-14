import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
// import { Link } from 'react-router-dom';
import Thermostat from '../Thermostat/Thermostat';
import './UserDashboard.css';

import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
  user: state.user,
  devices: state.devices
});

class UserDashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
        temperature: 0,
    }
  }
  
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({type: 'GET_DATA'});

  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render() {
    let content = null;
    if (this.props.user.userName) {
      content = (
        <div>
          <h3
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          <Button style={{ margin: "15px" }} variant="raised" color="primary"
            onClick={this.logout}
          >
            Log Out
          </Button>
          </h3>
          <div className="thermostatDiv">
            <Thermostat/>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserDashboard);


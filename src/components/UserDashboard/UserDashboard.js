import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
// Componenets
import Nav from '../../components/Nav/Nav';
import Thermostat from '../Thermostat/Thermostat';
import './UserDashboard.css';
// Material UI
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
        <div className="top">
          <h3 id="welcome">
            Welcome, { this.props.user.userName }!
            <Button 
              style={{ margin: "15px", backgroundColor: "rgb(58,141,241)" }} variant="raised" color="primary"
              onClick={this.logout}
            >
              Log Out
            </Button>
            <hr/>
          </h3>
          <div className="thermometer">
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

export default connect(mapStateToProps)(UserDashboard);


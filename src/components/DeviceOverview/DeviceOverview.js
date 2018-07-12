import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';
import DeviceItem from '../DeviceItem/DeviceItem';
import Thermostat from '../Thermostat/Thermostat';

const mapStateToProps = state => ({
  user: state.user,
  devices: state.devices
});

class DeviceOverview extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: "GET_DEVICES"});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          
          <div>
            <Thermostat/>
          </div>
          <div>
            <p>
              Device Overview.  This view will have the existing devices listed.  It will have a button to add a new device.
            </p>
            <div>
                {this.props.devices.devicesReducer.map( device => {
                  return <DeviceItem 
                  key = {device.id}
                  device={device}
                  />
                  })
                }
            </div>
            <Link to="/newDevice">
              <button>New Device</button>
            </Link>
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
export default connect(mapStateToProps)(DeviceOverview);

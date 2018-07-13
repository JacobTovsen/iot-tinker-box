import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';
import DeviceItem from '../DeviceItem/DeviceItem';
import './DeviceOverview.css';
import DeviceCard from '../DeviceCard/DeviceCard';

import Button from '@material-ui/core/Button';


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
            <p className="deviceDiv">
              Devices:
            </p>
            <div className="deviceDiv">
                {this.props.devices.devicesReducer.map( device => {
                  return <DeviceCard
                  key = {device.id}
                  device={device}
                  />
                  })
                }
            </div>
            <br/>
            <Link to="/newDevice">
              <Button variant="raised" color="primary">New Device</Button>
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

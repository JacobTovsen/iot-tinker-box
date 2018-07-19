import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';
// Components
import Nav from '../../components/Nav/Nav';
import './DeviceOverview.css';
// Material UI
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
            <br/>
            <div className="headofdevices">
            <Link to="/newDevice" style={{ textDecoration: 'none' }}>
              <Button variant="raised">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px"
	                height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" fill="black">
                  <g id="Bounding_Boxes">
	                  <g id="ui_x5F_spec_x5F_header_copy_3" display="none">
	                  </g>
	                  <path fill="none" d="M0,0h24v24H0V0z"/>
                    </g>
                  <g id="Outline">
                    <g id="ui_x5F_spec_x5F_header" display="none">
                    </g>
                    <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"/>
                  </g>
                  </svg>
                Add New Device
              </Button>
            </Link>
            <hr/>
            {/* <p className="deviceDiv">
              Devices:
            </p> */}
            </div>
            <div className="devicesDiv">
                {this.props.devices.devicesReducer.map( device => {
                  return <DeviceCard
                  key = {device.id}
                  device={device}
                  />
                  })
                }
            </div>
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

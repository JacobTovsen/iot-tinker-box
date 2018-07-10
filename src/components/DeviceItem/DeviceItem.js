import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class DeviceItem extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
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
          <p>Device Nickname: {this.props.device.device_nickname}</p>
          <p>Device ID: {this.props.device.device_build_id}</p>
          <p>Device Access Token: {this.props.device.access_token}</p>
          <p>Device Location: {this.props.device.location}</p>
          <p>Device Type: {this.props.device.device_type}</p>
        </div>
      );
    }

    return (
      <div>
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DeviceItem);

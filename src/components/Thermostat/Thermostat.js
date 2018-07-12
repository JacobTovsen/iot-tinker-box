import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
  devices: state.devices
});

class Thermostat extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type:'GET_TEMP'});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  deleteData = (id) => {
    console.log('this is deleteData id:', id);
    this.props.dispatch({type: 'DELETE_DATA', payload: id})
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
            <button>Temperature Up</button>
            <p>{this.props.devices.tempReducer}</p>
            <button>Temperature Up</button>

            
        </div>
    
      );
    }

    return (
      <tbody>
        { content }
      </tbody>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Thermostat);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
  devices: state.devices
});

class Temp extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: 'GET_NEWEST_TEMP'});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  tempUp = (temp) => {
    console.log('in tempUp, this is temp:', temp);
    temp ++;
    console.log('new temp:,', temp);
    this.props.dispatch({type: 'NEW_TEMP', payload: {temperature:temp}})
  }

  tempDown = (temp) => {
    console.log('in tempDown, this is temp', temp);
    temp --;
    console.log('new temp:,', temp);
    this.props.dispatch({type: 'NEW_TEMP', payload: {temperature: temp}})
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
            <div>
                <p>Current temperature reading from device:</p>
                {this.props.devices.newestTempReducer.map( temp => 
                                    <p key={temp.id}>{temp.temperature}</p>
                            )} 
            </div>
            <button onClick={ () => this.tempUp(this.props.temp.desired_temperature) }>Temperature Up</button>
            <br/>
            <p>Desired Temperature: {this.props.temp.desired_temperature}</p>
            <button onClick={ () => this.tempDown(this.props.temp.desired_temperature) }>Temperature Down</button>
            <br/>
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
export default connect(mapStateToProps)(Temp);

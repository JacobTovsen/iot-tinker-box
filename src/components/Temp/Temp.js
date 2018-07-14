import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import './Temp.css';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
  user: state.user,
  devices: state.devices
});

class Temp extends Component {
  constructor(props){
    super(props);
    this.state = {
        sensorTemperature: 70,
        heating: true
    }
  }
  
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

  isHeating() {

  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
            <Button vairant="raised" color="primary" onClick={ () => this.tempUp(this.props.temp.desired_temperature) }>Temperature Up</Button>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
            <br/>
            <p>Desired Temperature: {this.props.temp.desired_temperature}</p>
            <Button vairant="raised" color="primary" onClick={ () => this.tempDown(this.props.temp.desired_temperature) }>Temperature Down</Button>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M7.41,8.59L12,13.17l4.59-4.58L18,10l-6,6l-6-6L7.41,8.59z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
            <br/>
                <p>Current temperature reading from device:</p>
            <div>
                {this.props.devices.newestTempReducer.map( temp => 
                                    <div key={temp.id}>
                                        <p>{temp.temperature}</p>
                                    </div>
                            )} 
            </div>
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

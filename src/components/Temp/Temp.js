import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import './Temp.css';

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
    // if ( parseInt(this.props.devices.newestTempReducer[0].temperature) > 80 ) {
    //     this.setState({
    //         tempClass: 'hot'
    //     })
    // }

    if (this.props.user.userName) {
      content = (
        <div>
            <button onClick={ () => this.tempUp(this.props.temp.desired_temperature) }>Temperature Up</button>
            <br/>
            <p className={"heating ? 'heating' : 'cooling'"}>Desired Temperature: {this.props.temp.desired_temperature}</p>
            <button onClick={ () => this.tempDown(this.props.temp.desired_temperature) }>Temperature Down</button>
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
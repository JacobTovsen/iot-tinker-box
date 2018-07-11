import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import { Link } from 'react-router-dom';


const mapStateToProps = state => ({
  user: state.user,
});

class NewDevice extends Component {
  
  constructor(){
      super();

      this.state = {
          nickname: '',
          build_id: '',
          access_token: '',
          location: '',
          device_type: '',
          sensor_type: ''
      }
  }
  
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  submitNewDevice = () => {
      this.props.dispatch({type:'ADD_DEVICE', payload:this.state});
      alert('Your new device has been submitted!');
  }

  handleInputChange = (event) => {
    switch(event.target.id){
      case 'nickname':
        this.setState({nickname: event.target.value});
        break;
      case 'build_id':
        this.setState({build_id: event.target.value});
        break; 
      case 'access_token':
        this.setState({access_token: event.target.value});
        break;
      case 'location':
        this.setState({location: event.target.value});
        break;
      case 'device_type':
        this.setState({device_type: event.target.value});
        break;
      case 'sensor_type':
        this.setState({sensor_type: event.target.value});
        break;
      default:
        console.log('Invalid field');
        break;      
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
            <p>
              Add a new device
            </p>
            <input 
                placeholder="Device Nickname" 
                id="nickname"
                value={this.state.nickname}
                onChange={this.handleInputChange}
            />
            <input 
                placeholder="Device Build ID" 
                id="build_id"
                value={this.state.build_id}
                onChange={this.handleInputChange}
            />
            <input 
                placeholder="Device Access Token" 
                id="access_token"
                value={this.state.access_token}
                onChange={this.handleInputChange}
            />
            <input 
                placeholder="Device Location" 
                id="location"
                value={this.state.location}
                onChange={this.handleInputChange}
            />
            <input 
                placeholder="Device Type" 
                id="device_type"
                value={this.state.device_type}
                onChange={this.handleInputChange}
            />
            <input 
                placeholder="Sensor Type" 
                id="sensor_type"
                value={this.state.sensor_type}
                onChange={this.handleInputChange}
            />
            <button onClick={this.submitNewDevice} ><Link to="/device">Add Device</Link></button>
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
export default connect(mapStateToProps)(NewDevice);

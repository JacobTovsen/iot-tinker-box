import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Redirect } from "react-router-dom";
// Components
import Nav from '../../components/Nav/Nav';
import './NewDevice.css';
// Material UI
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

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
            sensor_type: '',
            deviceComplete: false
            
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
      this.setState({
          deviceComplete: true
      })
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

    const {deviceComplete} = this.state;
    if (deviceComplete) {
        return <Redirect to='/device'/>
        }
    
    if (this.props.user.userName) {
      content = (
        <div className="NewDevice">
            <p>
              Add a new device
            </p>
            <Input 
                placeholder="Device Nickname" 
                id="nickname"
                value={this.state.nickname}
                onChange={this.handleInputChange}
            />
            <Input 
                placeholder="Device Build ID" 
                id="build_id"
                value={this.state.build_id}
                onChange={this.handleInputChange}
            />
            <Input 
                placeholder="Device Access Token" 
                id="access_token"
                value={this.state.access_token}
                onChange={this.handleInputChange}
            />
            <Input 
                placeholder="Device Location" 
                id="location"
                value={this.state.location}
                onChange={this.handleInputChange}
            />
            <Input 
                placeholder="Device Type" 
                id="device_type"
                value={this.state.device_type}
                onChange={this.handleInputChange}
            />
            <Input 
                placeholder="Sensor Type" 
                id="sensor_type"
                value={this.state.sensor_type}
                onChange={this.handleInputChange}
            />
            <Button vairant="raised" color="primary" onClick={this.submitNewDevice} >Add Device</Button>
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

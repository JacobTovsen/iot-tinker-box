import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Temp from '../Temp/Temp';

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

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
            
                <div align="center">
                    {this.props.devices.tempReducer.map( temp => {
                            return <Temp
                            key = {temp.id}
                            temp={temp}
                            /> 
                        })} 
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
export default connect(mapStateToProps)(Thermostat);

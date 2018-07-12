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

  tempUp = (id) => {
    console.log('in tempUp, this is temp.id:', id);
  }

  tempDown = (id) => {
    console.log('in tempDown, this is temp.id:', id);

  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
            <button onClick={ () => this.tempUp(this.props.temp.id) }>Temperature Up</button>
            <br/>
            {this.props.temp.desired_temperature}
            <br/>
            <button onClick={ () => this.tempDown(this.props.temp.id) }>Temperature Down</button>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import DataPoint from '../DataPoint/DataPoint';
import './Data.css';
const mapStateToProps = state => ({
  user: state.user,
  devices: state.devices
});

class Data extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: 'GET_DATA'});
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
            <p>Data!</p>
            <table align="center">
                <thead>
                        <th>Time</th>
                        <th>Temperature</th>
                        <th>Edit</th>
                        <th>Delete</th>
                </thead>
                    {this.props.devices.dataReducer.map( dataPoint => {
                        return <DataPoint
                        key = {dataPoint.id}
                        dataPoint={dataPoint}
                        /> 
                    })}
            </table>
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
export default connect(mapStateToProps)(Data);

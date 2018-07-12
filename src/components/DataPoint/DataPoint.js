import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class DataPoint extends Component {
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

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
          <tr>
            <td>{this.props.dataPoint.date}</td>
            <td>{this.props.dataPoint.temperature}</td>
            <td><button>Edit</button></td>
            <td><button onClick={ () => this.deleteData(this.props.dataPoint.id) }>Delete</button></td>
          </tr>
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
export default connect(mapStateToProps)(DataPoint);

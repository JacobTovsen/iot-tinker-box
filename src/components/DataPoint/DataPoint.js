import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
// import Modal from '@material-ui/core/Modal';
import EditModal from '../EditModal/EditModal';
import DeleteModal from '../DeleteModal/DeleteModal';

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

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
          <tr>
            <td>{this.props.dataPoint.date}</td>
            <td>{this.props.dataPoint.temperature}</td>
            <td><EditModal dataPoint={this.props.dataPoint}/></td>
            <td><DeleteModal dataPoint={this.props.dataPoint}/></td>
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

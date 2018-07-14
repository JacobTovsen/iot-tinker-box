import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
// import Modal from '@material-ui/core/Modal';
import EditModal from '../EditModal/EditModal';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

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
          <TableRow>
            <TableCell>{this.props.dataPoint.date}</TableCell>
            <TableCell>{this.props.dataPoint.temperature}</TableCell>
            <TableCell><EditModal dataPoint={this.props.dataPoint}/></TableCell>
          </TableRow>
      );
    }

    return (
      <TableBody>
        { content }
      </TableBody>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DataPoint);

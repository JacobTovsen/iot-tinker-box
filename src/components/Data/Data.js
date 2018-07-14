import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Nav from '../Nav/Nav';
import DataPoint from '../DataPoint/DataPoint';
import './Data.css';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

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
            <p>Data from Photon</p>
            <Table style={{backgroundColor: "white"}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>Temp</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                    {this.props.devices.dataReducer.map( dataPoint => {
                        return <DataPoint
                        key = {dataPoint.id}
                        dataPoint={dataPoint}
                        /> 
                    })}
            </Table>
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
export default connect(mapStateToProps)(Data);

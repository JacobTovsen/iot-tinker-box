import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
// Components
import Nav from '../Nav/Nav';

// Material UI
import Button from '@material-ui/core/Button';


const mapStateToProps = state => ({
  user: state.user,
});

class Bio extends Component {

  componentDidMount() {
   
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
        <div className="graph">
          <h3>Jake Tovsen</h3>
          <h4>jacobtovsen@gmail.com</h4>
          <h4>github.com/JacobTovsen</h4>
          
        </div>
      );
    }

    return (
      <div>
          <Nav/>
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Bio);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
// import { Link } from 'react-router-dom';



const mapStateToProps = state => ({
  user: state.user,
});

class UserDashboard extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h3
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h3>
          <p>
            Dashboard - This view will have the current temperature or most recent reading.  It will have a button to have desired temp up, button down.  Log each click for new desired temp to database.  Reference most recent vs current temp and color the heating or cooling block appropriately.
          </p>
          <button
            onClick={this.logout}
          >
            Log Out
          </button>
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
export default connect(mapStateToProps)(UserDashboard);


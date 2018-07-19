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

class Tech extends Component {

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
          <h3>Tech used for this project include:</h3>
          <ul>
            <li>Particle Photon</li><br/>
            <li>Node-Cron</li><br/>
            <li>JavaScript</li><br/>
            <li>React.js</li><br/>
            <li>Material UI</li><br/>
            <li>Redux</li><br/>
            <li>Redux-Saga</li><br/>
            <li>Node.js</li><br/>
            <li>Express</li><br/>
            <li>PostgreSQL</li><br/>
            <li>Charts.js</li><br/>
          </ul>
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
export default connect(mapStateToProps)(Tech);

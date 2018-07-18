import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import ReactChartkick, {LineChart} from 'react-chartkick'
// Components
import Chart from 'chart.js'
import Nav from '../Nav/Nav';
import './Graph.css';
// Material UI
import Button from '@material-ui/core/Button';

ReactChartkick.addAdapter(Chart)

const mapStateToProps = state => ({
  user: state.user,
  devices: state.devices
});

class Graphs extends Component {
    constructor(){
        super();
  
        this.state = {        
              dataObject: {},
              apiDataObject: {}          
        }
    }
  
  
    componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: 'GET_DATA'});
    this.props.dispatch({type: 'GET_API_DATA'});
    this.loopData();
    this.loopApiData();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  backNav() {
    window.history.back();
  } 

  loopData() {
    let dataLooped = {};  
      for (let data of this.props.devices.dataReducer ){
          dataLooped[data.date] = Number(data.temperature)
      }
      this.setState({
        dataObject: {...dataLooped}
        })
  }

  loopApiData() {
    let dataLooped = {};  
      for (let data of this.props.devices.dataReducer ){
          dataLooped[data.date] = Number(data.temperature)
      }
      this.setState({
        apiDataObject: {...dataLooped}
        })
  }

  render() {
    let content = null;
    console.log('logging state in render', this.state.dataArray);
    if (this.props.user.userName) {
      content = (
        <div className="graph">
          <p>Graphs</p>
          <Button onClick={this.backNav}>Back</Button>
          <LineChart xtitle="Time" ytitle="Temp" data={this.state.dataObject} />

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
export default connect(mapStateToProps)(Graphs);

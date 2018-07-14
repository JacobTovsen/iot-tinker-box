import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
// import { Link } from 'react-router-dom';
import ReactChartkick, { AreaChart, LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)

const mapStateToProps = state => ({
  user: state.user,
  devices: state.devices
});

class Graphs extends Component {
    // constructor(){
    //     super();
  
    //     this.state = {        
    //           dataArray: []          
    //     }
    // }
  
  
    componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: 'GET_DATA'});
    this.loopData();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  loopData() {
    let dataLooped = [];  
    console.log('this is loop data;', this.props.devices.dataReducer);
    //   for (let data of this.props.devices.dataReducer ){
    //       console.log(data);
    //       dataLooped.push(data.date, data.temperature)
    //   }
    //   console.log(dataLooped);
    //   this.setState({
    //     dataArray: dataLooped
    //     })
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <p>Graphs</p>
          <AreaChart data={{"2017-01-01 00:00:00 -0800": 2, "2017-01-01 00:01:00 -0800": 5}} />

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
export default connect(mapStateToProps)(Graphs);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
// import { Link } from 'react-router-dom';
// import ReactChartkick, { AreaChart, LineChart, PieChart } from 'react-chartkick'
import ReactChartkick, { AreaChart, BarChart, PieChart, LineChart} from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)

const mapStateToProps = state => ({
  user: state.user,
  devices: state.devices
});

class Graphs extends Component {
    constructor(){
        super();
  
        this.state = {        
              dataObject: {}          
        }
    }
  
  
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
    let dataLooped = {};  
    console.log('this is loop data;', this.props.devices.dataReducer);
      for (let data of this.props.devices.dataReducer ){
          console.log('this is data:', data);
        //   this.makeString(data.date);
          dataLooped[data.date] = Number(data.temperature)
      }
      console.log(dataLooped);
      this.setState({
        dataObject: {...dataLooped}
        })
      console.log(this.state.dataArray);
  }

//   makeString(date){
//       toString(date);
//       console.log('this is date in makeString:', date);
//       return date
//   }
  render() {
    let content = null;
    console.log('logging state in render', this.state.dataArray);
    if (this.props.user.userName) {
      content = (
        <div>
          <p>Graphs</p>
          <LineChart backgroundColor="white" xtitle="Time" ytitle="Temp" data={this.state.dataObject} />

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

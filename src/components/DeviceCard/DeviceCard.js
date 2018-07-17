import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { compose } from "redux";
import { Link } from 'react-router-dom';
import './DeviceCard.css';
// Material UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';


const mapStateToProps = state => ({
    user: state.user,
  });

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: '45px',
  },
  expandOpen: {
    transform: 'rotate(360deg)',
  },
  avatar: {
    backgroundColor: 'rgb(222, 104, 100)',
  },
});

class DeviceCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card} style={{marginTop: "15px"}}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {this.props.device.id}
              </Avatar>
            }
            title={this.props.device.device_nickname}
            subheader={this.props.device.device_location}
          />
          <CardMedia
            className={classes.media}
            image={require('../../Images/DHT11_Interfacing_Diagram.png')}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography component="p">

            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
          <Link to="/data" style={{ textDecoration: 'none', margin:"5px"}}>
            <Button className="data" style={{backgroundColor: "rgb(58,141,241)"}} variant="raised" color="primary">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px"
	                    fill="white" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
                    <g id="Bounding_Boxes">
	                    <g id="ui_x5F_spec_x5F_header_copy_2">
	                    </g>
	                    <path fill="none" d="M0,0h24v24H0V0z"/>
                    </g>
                    <g id="Outline">
	                    <g id="ui_x5F_spec_x5F_header">
	                    </g>
	                    <path d="M12.01,6c2.61,0,4.89,1.86,5.4,4.43l0.3,1.5l1.52,0.11c1.56,0.11,2.78,1.41,2.78,2.96c0,1.65-1.35,3-3,3h-13
		                    c-2.21,0-4-1.79-4-4c0-2.05,1.53-3.76,3.56-3.97l1.07-0.11l0.5-0.95C8.08,7.14,9.95,6,12.01,6 M12.01,4C9.12,4,6.6,5.64,5.35,8.04
		                    C2.35,8.36,0.01,10.91,0.01,14c0,3.31,2.69,6,6,6h13c2.76,0,5-2.24,5-5c0-2.64-2.05-4.78-4.64-4.96C18.68,6.59,15.65,4,12.01,4
		                    L12.01,4z"
                        />
                    </g>
                </svg>Data</Button>
          </Link>
          <Link to="/graphs" style={{ textDecoration: 'none', margin:"5px"}}>
            <Button style={{backgroundColor: "rgb(58,141,241)"}} variant="raised" color="primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>
                    <path fill="none" d="M0 0h24v24H0z"/>
                </svg>
                Graphs
            </Button>
            
          </Link>
            <IconButton
                
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />More
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph variant="body2">
                Device Details:
              </Typography>
              <Typography paragraph>
                Device ID: {this.props.device.device_build_id}
              </Typography>
              <Typography paragraph>
                Device Access Token: {this.props.device.access_token}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

DeviceCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles),connect(mapStateToProps))(DeviceCard);

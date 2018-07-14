import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import { compose } from "redux";
import './DeviceCard.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


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
    backgroundColor: red[500],
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
            <Button variant="raised" color="primary">Data</Button>
          </Link>
          <Link to="/graphs" style={{ textDecoration: 'none', margin:"5px"}}>
            <Button variant="raised" color="primary">Graphs</Button>
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

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from "redux";
// Material UI
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
    user: state.user,
  });

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class DeleteModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteDevice = (id) => {
    console.log('in deleteDevice in modal!', id);
    this.props.dispatch({type: 'DELETE_DEVICE', payload: id})
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button variant="raised"  onClick={this.handleOpen}>Delete This Device</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Are you sure you want to delete this device?
            </Typography>
            <Button onClick={ () => this.deleteDevice(this.props.device.id) }>Delete</Button>
            <Button onClick={this.handleClose}>Cancel</Button>
          </div>
        </Modal>
      </div>
    );
  }
}


export default compose(withStyles(styles),connect(mapStateToProps))(DeleteModal);

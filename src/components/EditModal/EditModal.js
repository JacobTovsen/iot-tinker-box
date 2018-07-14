import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from "redux";
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import DeleteModal from '../DeleteModal/DeleteModal';
const mapStateToProps = state => ({
    user: state.user,
  });

function getModalStyle() {
  const top = 50;
  const left = 50;

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

class EditModal extends React.Component {
  state = {
    open: false,
    edit_value: '',
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleInputChange = (event) => {
    switch(event.target.id){
      case 'edit_value':
        this.setState({edit_value: event.target.value});
        break;
      default:
        console.log('Invalid field');
        break;      
    }
  }

  editDataPoint = (id) => {
    console.log('id:', id, 'edit_value:', this.state.edit_value);
    let editTemp = Number(this.state.edit_value);
    let toSend = {
        id: id, 
        edit_value: editTemp
    }
    this.props.dispatch({type: 'EDIT_DATA', payload: toSend})
    this.setState({edit_value:''});
  }


  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen}>Edit</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Edit Temperature Data Point
            </Typography>
            <Input
                placeholder="Enter New Value" 
                id="edit_value"
                value={this.state.edit_value}
                onChange={this.handleInputChange}
            >
            </Input>
            <Button onClick={ () => this.editDataPoint(this.props.dataPoint.id) }>Submit</Button>
            <Button onClick={this.handleClose}>Close</Button>
            <DeleteModal dataPoint={this.props.dataPoint}/>

          </div>
        </Modal>
      </div>
    );
  }
}

export default compose(withStyles(styles),connect(mapStateToProps))(EditModal);

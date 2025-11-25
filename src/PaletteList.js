import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import { Link } from 'react-router-dom';
import styles from './styles/PaletteListStyles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      deletingId: ""
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.goToPalette = this.goToPalette.bind(this);
  }

  openDialog(id) {
    this.setState({ openDeleteDialog: true, deletingId: id });
  }

  closeDialog() {
    this.setState({ openDeleteDialog: false, deletingId: "" });
  }

  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }

  handleDelete() {
    this.props.deletePalette(this.state.deletingId);
    this.closeDialog();
  }
  
  render() {
    const { palettes, classes } = this.props;
    const { openDeleteDialog } = this.state;
    
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Color Palettes</h1>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/palette/new"
              className={classes.newPaletteButton}
              startIcon={<AddIcon />}
            >
              Create Palette
            </Button>
          </nav>

          <div className={classes.palettes}>
            {palettes.map((palette) => (
              <MiniPalette 
                {...palette} 
                key={palette.id}
                id={palette.id}
                handleClick={this.goToPalette}
                handleDelete={this.openDialog}
              />
            ))}
          </div>
        </div>
        <Dialog
          open={openDeleteDialog}
          aria-labelledby="delete-dialog-title"
          onClose={this.closeDialog}
        >
          <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this palette? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);

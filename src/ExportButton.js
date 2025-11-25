import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import ExportDialog from './ExportDialog';

const styles = {
  button: {
    color: '#f5f5f5',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(100, 181, 246, 0.1)',
      color: '#64B5F6',
    },
  },
  iconButton: {
    color: '#f5f5f5',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(100, 181, 246, 0.1)',
      color: '#64B5F6',
    },
  },
};

class ExportButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  openDialog() {
    this.setState({ dialogOpen: true });
  }

  closeDialog() {
    this.setState({ dialogOpen: false });
  }

  render() {
    const { classes, palette, paletteElement, variant, size } = this.props;
    const { dialogOpen } = this.state;

    return (
      <>
        {variant === 'icon' ? (
          <IconButton
            onClick={this.openDialog}
            className={classes.iconButton}
            size={size || 'medium'}
            title="Export Palette"
          >
            <GetAppIcon />
          </IconButton>
        ) : (
          <Button
            onClick={this.openDialog}
            className={classes.button}
            startIcon={<GetAppIcon />}
            size={size || 'medium'}
          >
            Export
          </Button>
        )}

        <ExportDialog
          open={dialogOpen}
          onClose={this.closeDialog}
          palette={palette}
          paletteElement={paletteElement}
        />
      </>
    );
  }
}

export default withStyles(styles)(ExportButton);



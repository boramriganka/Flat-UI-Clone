import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import ExportDialog from './ExportDialog';

const styles = {
  root: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '350px',
    maxHeight: '500px',
    backgroundColor: '#1a1a1a',
    border: '2px solid #64B5F6',
    borderRadius: '8px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '1rem',
    backgroundColor: '#2a2a2a',
    borderBottom: '1px solid #444',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#64B5F6',
    fontWeight: '500',
    fontSize: '1.1rem',
  },
  count: {
    color: '#aaa',
    fontSize: '0.9rem',
    marginLeft: '0.5rem',
  },
  content: {
    padding: '1rem',
    overflowY: 'auto',
    flexGrow: 1,
  },
  colorItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem',
    marginBottom: '0.5rem',
    backgroundColor: '#2a2a2a',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#333',
    },
  },
  colorSwatch: {
    width: '40px',
    height: '40px',
    borderRadius: '6px',
    marginRight: '1rem',
    border: '2px solid #444',
    flexShrink: 0,
  },
  colorInfo: {
    flexGrow: 1,
    minWidth: 0,
  },
  colorName: {
    color: '#e0e0e0',
    fontSize: '0.9rem',
    fontWeight: '500',
    marginBottom: '0.25rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  colorCode: {
    color: '#aaa',
    fontSize: '0.85rem',
    fontFamily: 'monospace',
  },
  removeButton: {
    color: '#f44336',
    padding: '4px',
    '&:hover': {
      backgroundColor: 'rgba(244, 67, 54, 0.1)',
    },
  },
  actions: {
    padding: '1rem',
    borderTop: '1px solid #444',
    display: 'flex',
    gap: '0.5rem',
  },
  actionButton: {
    flex: 1,
  },
  exportButton: {
    backgroundColor: '#64B5F6',
    color: 'white',
    '&:hover': {
      backgroundColor: '#42A5F5',
    },
  },
  clearButton: {
    color: '#f44336',
    borderColor: '#f44336',
    '&:hover': {
      backgroundColor: 'rgba(244, 67, 54, 0.1)',
      borderColor: '#f44336',
    },
  },
  emptyState: {
    textAlign: 'center',
    padding: '2rem 1rem',
    color: '#aaa',
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    opacity: 0.5,
  },
};

class ColorSelectionManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exportDialogOpen: false,
    };
    this.openExportDialog = this.openExportDialog.bind(this);
    this.closeExportDialog = this.closeExportDialog.bind(this);
    this.exportPreviewRef = React.createRef();
  }

  openExportDialog() {
    this.setState({ exportDialogOpen: true });
  }

  closeExportDialog() {
    this.setState({ exportDialogOpen: false });
  }

  render() {
    const { classes, selectedColors, onRemoveColor, onClearAll, onClose, paletteName } = this.props;
    const { exportDialogOpen } = this.state;

    if (!selectedColors || selectedColors.length === 0) {
      return null;
    }

    // Create a palette object for export
    const exportPalette = {
      paletteName: paletteName || 'Selected Colors',
      emoji: '🎨',
      colors: selectedColors,
    };

    return (
      <>
        <Paper className={classes.root} elevation={8}>
          <div className={classes.header}>
            <div>
              <Typography className={classes.title} component="span">
                Selected Colors
              </Typography>
              <Typography className={classes.count} component="span">
                ({selectedColors.length})
              </Typography>
            </div>
            <IconButton size="small" onClick={onClose} style={{ color: '#aaa' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>

          <div className={classes.content} ref={this.exportPreviewRef}>
            {selectedColors.map((color, index) => (
              <div key={`${color.color}-${index}`} className={classes.colorItem}>
                <div
                  className={classes.colorSwatch}
                  style={{ backgroundColor: color.color }}
                />
                <div className={classes.colorInfo}>
                  <div className={classes.colorName}>{color.name}</div>
                  <div className={classes.colorCode}>{color.color}</div>
                </div>
                <IconButton
                  size="small"
                  className={classes.removeButton}
                  onClick={() => onRemoveColor(index)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
            ))}
          </div>

          <div className={classes.actions}>
            <Tooltip title="Remove all selected colors" placement="top" arrow>
              <Button
                variant="outlined"
                className={`${classes.actionButton} ${classes.clearButton}`}
                startIcon={<DeleteSweepIcon />}
                onClick={onClearAll}
              >
                Clear All
              </Button>
            </Tooltip>
            <Tooltip title="Export selected colors in various formats" placement="top" arrow>
              <Button
                variant="contained"
                className={`${classes.actionButton} ${classes.exportButton}`}
                startIcon={<GetAppIcon />}
                onClick={this.openExportDialog}
              >
                Export
              </Button>
            </Tooltip>
          </div>
        </Paper>

        <ExportDialog
          open={exportDialogOpen}
          onClose={this.closeExportDialog}
          palette={exportPalette}
          paletteElement={this.exportPreviewRef.current}
        />
      </>
    );
  }
}

export default withStyles(styles)(ColorSelectionManager);


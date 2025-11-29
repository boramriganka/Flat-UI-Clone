import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GetAppIcon from '@material-ui/icons/GetApp';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import RefreshIcon from '@material-ui/icons/Refresh';
import ImageExportPreview from './ImageExportPreview';
import {
  exportAsCSS,
  exportAsSCSS,
  exportAsJSON,
  exportAsTailwind,
  exportAsJavaScript,
  exportAsSVG,
  exportAsImage,
  copyToClipboard,
  downloadFile,
  getExportFormats,
} from './helpers/exportHelpers';

const styles = {
  dialog: {
    '& .MuiDialog-paper': {
      backgroundColor: '#1a1a1a',
      color: '#e0e0e0',
      minWidth: '600px',
      maxWidth: '800px',
    },
  },
  dialogTitle: {
    backgroundColor: '#2a2a2a',
    borderBottom: '1px solid #444',
  },
  tabs: {
    borderBottom: '1px solid #444',
    '& .MuiTab-root': {
      color: '#aaa',
      minWidth: '100px',
    },
    '& .Mui-selected': {
      color: '#64B5F6',
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#64B5F6',
    },
  },
  codeBlock: {
    backgroundColor: '#0d1117',
    color: '#c9d1d9',
    padding: '1rem',
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    overflowX: 'auto',
    maxHeight: '400px',
    marginTop: '1rem',
    border: '1px solid #30363d',
  },
  actions: {
    padding: '1rem',
    backgroundColor: '#2a2a2a',
    borderTop: '1px solid #444',
    justifyContent: 'space-between',
  },
  formatInfo: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
    color: '#aaa',
  },
  imageNote: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
    color: '#64B5F6',
  },
  imageStyleSelector: {
    marginTop: '1.5rem',
    padding: '1rem',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
    '& .MuiFormLabel-root': {
      color: '#e0e0e0',
      marginBottom: '0.5rem',
    },
    '& .MuiFormControlLabel-label': {
      color: '#aaa',
    },
    '& .MuiRadio-root': {
      color: '#64B5F6',
    },
  },
  imagePreviewContainer: {
    marginTop: '1.5rem',
    maxHeight: '400px',
    overflowY: 'auto',
    overflowX: 'auto',
    border: '1px solid #444',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  imagePreviewContainerFull: {
    marginTop: '1.5rem',
    height: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #444',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
    overflow: 'auto',
    padding: '1rem',
  },
  imagePreviewWrapperFull: {
    maxWidth: '100%',
    maxHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > div': {
      maxWidth: '100%',
      maxHeight: '100%',
      '& > div': {
        transform: 'scale(0.8)',
        transformOrigin: 'center center',
      },
    },
  },
  previewControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
  },
  zoomControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  zoomButton: {
    color: '#64B5F6',
    padding: '0.5rem',
  },
  zoomLevel: {
    color: '#e0e0e0',
    minWidth: '60px',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
  hiddenPreview: {
    position: 'absolute',
    left: '-9999px',
    top: '-9999px',
  },
};

class ExportDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      snackbarOpen: false,
      snackbarMessage: '',
      exportedCode: '',
      imageExportStyle: 'grid', // 'grid', 'card', 'strip', 'list', 'palette'
      previewZoom: 0.5, // Default zoom level (50%)
      isFullPreview: false, // Toggle between scrollable and fit-to-view
    };
    this.imagePreviewRef = React.createRef();
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.generateExportCode = this.generateExportCode.bind(this);
    this.handleImageStyleChange = this.handleImageStyleChange.bind(this);
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleZoomReset = this.handleZoomReset.bind(this);
    this.toggleFullPreview = this.toggleFullPreview.bind(this);
  }

  componentDidMount() {
    this.generateExportCode();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeTab !== this.state.activeTab) {
      this.generateExportCode();
    }
  }

  handleTabChange(event, newValue) {
    this.setState({ activeTab: newValue });
  }

  handleImageStyleChange(event) {
    this.setState({ imageExportStyle: event.target.value });
  }

  handleZoomIn() {
    this.setState(st => ({ previewZoom: Math.min(st.previewZoom + 0.1, 1.5) }));
  }

  handleZoomOut() {
    this.setState(st => ({ previewZoom: Math.max(st.previewZoom - 0.1, 0.2) }));
  }

  handleZoomReset() {
    this.setState({ previewZoom: 0.5 });
  }

  toggleFullPreview() {
    this.setState(st => ({ isFullPreview: !st.isFullPreview }));
  }

  generateExportCode() {
    const { palette } = this.props;
    const { activeTab } = this.state;
    const formats = ['css', 'scss', 'json', 'tailwind', 'javascript', 'svg', 'png', 'jpeg'];
    const format = formats[activeTab];

    let code = '';
    try {
      switch (format) {
        case 'css':
          code = exportAsCSS(palette);
          break;
        case 'scss':
          code = exportAsSCSS(palette);
          break;
        case 'json':
          code = exportAsJSON(palette);
          break;
        case 'tailwind':
          code = exportAsTailwind(palette);
          break;
        case 'javascript':
          code = exportAsJavaScript(palette);
          break;
        case 'svg':
          code = exportAsSVG(palette);
          break;
        case 'png':
        case 'jpeg':
          code = `Image export will capture the current palette view.\nClick "Download" to export as ${format.toUpperCase()}.`;
          break;
        default:
          code = '';
      }
    } catch (error) {
      code = `Error generating export: ${error.message}`;
    }

    this.setState({ exportedCode: code });
  }

  async handleCopy() {
    const { exportedCode, activeTab } = this.state;
    const formats = ['css', 'scss', 'json', 'tailwind', 'javascript', 'svg', 'png', 'jpeg'];
    const format = formats[activeTab];

    if (format === 'png' || format === 'jpeg') {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'Image formats cannot be copied. Use Download instead.',
      });
      return;
    }

    const success = await copyToClipboard(exportedCode);
    if (success) {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'Copied to clipboard!',
      });
    } else {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'Failed to copy to clipboard',
      });
    }
  }

  async handleDownload() {
    const { palette, paletteElement, isSelectionExport } = this.props;
    const { activeTab, imageExportStyle } = this.state;
    const formats = ['css', 'scss', 'json', 'tailwind', 'javascript', 'svg', 'png', 'jpeg'];
    const format = formats[activeTab];
    const formatInfo = getExportFormats().find(f => f.id === format);
    const safeName = palette.paletteName.toLowerCase().replace(/\s+/g, '-');

    try {
      if (format === 'png' || format === 'jpeg') {
        if (imageExportStyle === 'palette') {
          // Capture the actual palette view (colors only)
          if (!paletteElement) {
            this.setState({
              snackbarOpen: true,
              snackbarMessage: 'Palette element not found for image export',
            });
            return;
          }
          await exportAsImage(paletteElement, safeName, format, true);
        } else {
          // Capture the custom styled preview
          if (!this.imagePreviewRef || !this.imagePreviewRef.current) {
            this.setState({
              snackbarOpen: true,
              snackbarMessage: 'Preview element not found',
            });
            return;
          }
          await exportAsImage(this.imagePreviewRef, safeName, format, false);
        }
        
        this.setState({
          snackbarOpen: true,
          snackbarMessage: `${format.toUpperCase()} exported successfully!`,
        });
      } else {
        downloadFile(this.state.exportedCode, `${safeName}.${formatInfo.extension}`, formatInfo.mimeType);
        this.setState({
          snackbarOpen: true,
          snackbarMessage: 'File downloaded successfully!',
        });
      }
    } catch (error) {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: `Export failed: ${error.message}`,
      });
    }
  }

  closeSnackbar() {
    this.setState({ snackbarOpen: false });
  }

  render() {
    const { classes, open, onClose, palette } = this.props;
    const { activeTab, snackbarOpen, snackbarMessage, exportedCode, imageExportStyle, previewZoom, isFullPreview } = this.state;
    const formats = getExportFormats();
    const isImageFormat = activeTab >= 6; // PNG and JPEG are last two tabs

    return (
      <>
        <Dialog open={open} onClose={onClose} className={classes.dialog} maxWidth="md" fullWidth>
          <DialogTitle className={classes.dialogTitle}>
            <Typography variant="h6">Export Palette</Typography>
          </DialogTitle>

          <DialogContent style={{ padding: 0 }}>
            <Tabs
              value={activeTab}
              onChange={this.handleTabChange}
              className={classes.tabs}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="CSS" />
              <Tab label="SCSS" />
              <Tab label="JSON" />
              <Tab label="Tailwind" />
              <Tab label="JavaScript" />
              <Tab label="SVG" />
              <Tab label="PNG" />
              <Tab label="JPEG" />
            </Tabs>

            <div style={{ padding: '1.5rem' }}>
              {isImageFormat ? (
                <>
                  <div className={classes.imageNote}>
                    <Typography variant="body1" style={{ marginBottom: '0.5rem', fontWeight: '500' }}>
                      📸 Image Export
                    </Typography>
                    <Typography variant="body2">
                      Choose an export style and click "Download" to save your palette as a high-quality image.
                    </Typography>
                  </div>

                  <FormControl component="fieldset" className={classes.imageStyleSelector}>
                    <FormLabel component="legend">Export Style</FormLabel>
                    <RadioGroup
                      value={imageExportStyle}
                      onChange={this.handleImageStyleChange}
                    >
                      <FormControlLabel
                        value="grid"
                        control={<Radio />}
                        label="Grid Layout - Clean grid with color swatches and codes"
                      />
                      <FormControlLabel
                        value="card"
                        control={<Radio />}
                        label="Card Layout - Individual cards for each color"
                      />
                      <FormControlLabel
                        value="strip"
                        control={<Radio />}
                        label="Horizontal Strip - Colors side by side"
                      />
                      <FormControlLabel
                        value="list"
                        control={<Radio />}
                        label="Detailed List - Full color information with RGB values"
                      />
                      <FormControlLabel
                        value="palette"
                        control={<Radio />}
                        label="Palette View - Capture the actual palette interface"
                      />
                    </RadioGroup>
                  </FormControl>

                  {imageExportStyle !== 'palette' && (
                    <>
                      <div className={classes.previewControls}>
                        <div className={classes.zoomControls}>
                          <Tooltip title="Zoom out (minimum 20%)" placement="top" arrow>
                            <span>
                              <IconButton
                                size="small"
                                onClick={this.handleZoomOut}
                                className={classes.zoomButton}
                                disabled={previewZoom <= 0.2}
                              >
                                <ZoomOutIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                          <Typography className={classes.zoomLevel}>
                            {Math.round(previewZoom * 100)}%
                          </Typography>
                          <Tooltip title="Zoom in (maximum 150%)" placement="top" arrow>
                            <span>
                              <IconButton
                                size="small"
                                onClick={this.handleZoomIn}
                                className={classes.zoomButton}
                                disabled={previewZoom >= 1.5}
                              >
                                <ZoomInIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                          <Tooltip title="Reset zoom to 50%" placement="top" arrow>
                            <IconButton
                              size="small"
                              onClick={this.handleZoomReset}
                              className={classes.zoomButton}
                            >
                              <RefreshIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                        <Tooltip 
                          title={isFullPreview ? "Switch to scrollable view with zoom controls" : "Fit entire preview to screen"} 
                          placement="top" 
                          arrow
                        >
                          <Button
                            size="small"
                            startIcon={<AspectRatioIcon />}
                            onClick={this.toggleFullPreview}
                            style={{ color: '#64B5F6' }}
                          >
                            {isFullPreview ? 'Scrollable View' : 'Fit to View'}
                          </Button>
                        </Tooltip>
                      </div>
                      
                      {isFullPreview ? (
                        <div className={classes.imagePreviewContainerFull}>
                          <div className={classes.imagePreviewWrapperFull}>
                            <div ref={this.imagePreviewRef}>
                              <ImageExportPreview palette={palette} style={imageExportStyle} />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={classes.imagePreviewContainer}>
                          <div 
                            ref={this.imagePreviewRef}
                            style={{ 
                              transform: `scale(${previewZoom})`,
                              transformOrigin: 'top left',
                              transition: 'transform 0.2s ease',
                            }}
                          >
                            <ImageExportPreview palette={palette} style={imageExportStyle} />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className={classes.formatInfo}>
                    <Typography variant="body2">{formats[activeTab].description}</Typography>
                  </div>
                  <pre className={classes.codeBlock}>{exportedCode}</pre>
                </>
              )}
            </div>
          </DialogContent>

          <DialogActions className={classes.actions}>
            <Button onClick={onClose} style={{ color: '#aaa' }}>
              Close
            </Button>
            <div>
              {!isImageFormat && (
                <Button
                  onClick={this.handleCopy}
                  startIcon={<FileCopyIcon />}
                  style={{ color: '#64B5F6', marginRight: '0.5rem' }}
                >
                  Copy
                </Button>
              )}
              <Button
                onClick={this.handleDownload}
                startIcon={<GetAppIcon />}
                variant="contained"
                style={{ backgroundColor: '#64B5F6', color: 'white' }}
              >
                Download
              </Button>
            </div>
          </DialogActions>
        </Dialog>

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={this.closeSnackbar}
          message={snackbarMessage}
          action={
            <IconButton size="small" color="inherit" onClick={this.closeSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </>
    );
  }
}

export default withStyles(styles)(ExportDialog);



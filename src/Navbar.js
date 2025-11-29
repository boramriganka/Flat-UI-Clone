import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./styles/NavbarStyles";
import ExportButton from "./ExportButton";
import ContrastChecker from "./ContrastChecker";
import PaletteAccessibilityReport from "./PaletteAccessibilityReport";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      format: "hex", 
      open: false,
      accessibilityDialogOpen: false,
      accessibilityView: 'checker', // 'checker' or 'report'
    };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.openAccessibilityDialog = this.openAccessibilityDialog.bind(this);
    this.closeAccessibilityDialog = this.closeAccessibilityDialog.bind(this);
    this.toggleAccessibilityView = this.toggleAccessibilityView.bind(this);
  }
  handleFormatChange(e) {
    this.setState({ format: e.target.value, open: true });
    this.props.handleChange(e.target.value);
  }
  closeSnackbar() {
    this.setState({ open: false });
  }
  openAccessibilityDialog() {
    this.setState({ accessibilityDialogOpen: true });
  }
  closeAccessibilityDialog() {
    this.setState({ accessibilityDialogOpen: false });
  }
  toggleAccessibilityView() {
    this.setState(st => ({
      accessibilityView: st.accessibilityView === 'checker' ? 'report' : 'checker'
    }));
  }
  render() {
    const { level, changeLevel, showSlider, classes, palette, paletteElement } = this.props;
    const { format, accessibilityDialogOpen, accessibilityView } = this.state;
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to='/'>reactcolorpicker</Link>
        </div>
        {showSlider && (
          <Tooltip 
            title="Adjust color shade intensity (100=lightest, 900=darkest)" 
            placement="bottom" 
            arrow
          >
            <div>
              <span>Level: {level}</span>
              <div className={classes.slider}>
                <Slider
                  defaultValue={level}
                  min={100}
                  max={900}
                  step={100}
                  onAfterChange={changeLevel}
                />
              </div>
            </div>
          </Tooltip>
        )}
        <Tooltip 
          title="Change color code format (HEX, RGB, RGBA)" 
          placement="bottom" 
          arrow
        >
          <div className={classes.selectContainer}>
            <Select value={format} onChange={this.handleFormatChange}>
              <MenuItem value='hex'>HEX - #ffffff</MenuItem>
              <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
              <MenuItem value='rgba'>RGBA - rgba(255,255,255, 1.0)</MenuItem>
            </Select>
          </div>
        </Tooltip>
        {palette && (
          <>
            <Tooltip 
              title="Check WCAG accessibility & contrast ratios" 
              placement="bottom" 
              arrow
            >
              <IconButton
                onClick={this.openAccessibilityDialog}
                className={classes.iconButton}
              >
                <AccessibilityNewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip 
              title="Export palette in multiple formats (CSS, JSON, PNG, etc.)" 
              placement="bottom" 
              arrow
            >
              <span>
                <ExportButton 
                  palette={palette} 
                  paletteElement={paletteElement}
                  variant="icon"
                />
              </span>
            </Tooltip>
          </>
        )}
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={3000}
          message={
            <span id='message-id'>
              Format Changed To {format.toUpperCase()}
            </span>
          }
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              onClick={this.closeSnackbar}
              color='inherit'
              key='close'
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        
        <Dialog
          open={accessibilityDialogOpen}
          onClose={this.closeAccessibilityDialog}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            style: { backgroundColor: '#121212', minHeight: '80vh' }
          }}
        >
          {palette && (
            accessibilityView === 'checker' ? (
              <ContrastChecker />
            ) : (
              <PaletteAccessibilityReport palette={palette} />
            )
          )}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            padding: '1rem',
            backgroundColor: '#1a1a1a',
            borderTop: '1px solid #444'
          }}>
            <IconButton onClick={this.toggleAccessibilityView} style={{ color: '#64B5F6' }}>
              {accessibilityView === 'checker' ? 'View Palette Report' : 'View Contrast Checker'}
            </IconButton>
            <IconButton onClick={this.closeAccessibilityDialog} style={{ color: '#aaa' }}>
              <CloseIcon />
            </IconButton>
          </div>
        </Dialog>
      </header>
    );
  }
}
export default withStyles(styles)(Navbar);
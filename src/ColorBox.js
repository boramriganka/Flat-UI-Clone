import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from 'chroma-js'
import {withStyles} from "@material-ui/styles"
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import styles from './styles/ColorBoxStyles'
class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
    this.handleSelectColor = this.handleSelectColor.bind(this);
  }
  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }
  handleSelectColor(e) {
    e.stopPropagation();
    const { name, background, onSelectColor, isSelected } = this.props;
    if (onSelectColor) {
      onSelectColor({ name, color: background }, isSelected);
    }
  }
  render() {
    const { name, background, paletteId, id, showingFullColorPalette, classes, onSelectColor, isSelected } = this.props;
    const { copied } = this.state;
    const isDarkColor = chroma(background).luminance() <= 0.08;
    const isLightColor = chroma(background).luminance() >= 0.7;
    const arrayOfCopyMsg = ['copied!','Right One !','Will do!','It\'ll Rock !'];
    var randIndex = Math.floor(Math.random()*arrayOfCopyMsg.length);
    const randomCopyMsg = arrayOfCopyMsg[randIndex];
    const textColor = chroma(background).luminance() > 0.5 ? '#000' : '#fff';
    
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background : background}} className={classes.ColorBox}>
          <div
            style={{ background : background}}
            className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
          />
          <div className={`${classes.copyMsg} ${copied && classes.showMessage}`}>
            <h1>{randomCopyMsg}</h1>
            <p className={classes.copyText}>{this.props.background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <Tooltip title="Click to copy color code to clipboard" placement="top" arrow>
              <button className={classes.copyButton}>copy</button>
            </Tooltip>
          </div>
          {onSelectColor && (
            <Tooltip 
              title={isSelected ? "Remove from export selection" : "Add to export selection"} 
              placement="right" 
              arrow
            >
              <IconButton
                className={classes.selectButton}
                onClick={this.handleSelectColor}
                size="small"
                style={{ color: textColor }}
              >
                {isSelected ? <CheckCircleIcon /> : <AddCircleIcon />}
              </IconButton>
            </Tooltip>
          )}
          {/* eventpropogation stops the copy of palette when we press more
                with react transitions enabled */}
          {showingFullColorPalette && (
            <Tooltip title="View all shades of this color" placement="bottom" arrow>
              <Link
                to={`/palette/${paletteId}/${id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <span className={classes.seeMore}>MORE</span>
              </Link>
            </Tooltip>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox)
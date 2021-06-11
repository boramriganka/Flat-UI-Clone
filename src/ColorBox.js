import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from 'chroma-js'
import {withStyles} from "@material-ui/styles"
import styles from './styles/ColorBoxStyles'
class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }
  render() {
    const { name, background, paletteId, id, showingFullColorPalette,classes } = this.props;
    const { copied } = this.state;
    const isDarkColor = chroma(background).luminance() <= 0.08;
    const isLightColor = chroma(background).luminance() >= 0.7;
    const arrayOfCopyMsg = ['copied!','Right One !','Will do!','It\'ll Rock !'];
    var randIndex = Math.floor(Math.random()*arrayOfCopyMsg.length);
    const randomCopyMsg = arrayOfCopyMsg[randIndex];
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
            <button className={classes.copyButton}>copy</button>
          </div>
          {/* eventpropogation stops the copy of palette when we press more
                with react transitions enabled */}
          {showingFullColorPalette && (
            <Link
              to={`/palette/${paletteId}/${id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className={classes.seeMore}>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox)
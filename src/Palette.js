import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import {withStyles} from '@material-ui/styles'
import styles from './styles/PaletteStyles'
import PaletteFooter from './PaletteFooter'
class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      format:"hex"
    };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }
  changeLevel(level) {
    this.setState({ level });
  }
  changeFormat(val){
    this.setState({format:val});
  }
  render() {
    const { colors,paletteName,emoji,id} = this.props.palette;
    const {classes} = this.props;
    const { level,format } = this.state; 
    const colorBoxes = colors[level].map((color) => (
      <ColorBox 
      key={color.id} 
      background={color[format]} 
      name={color.name} 
      id ={color.id}
      paletteId={id} // accesing palette name from history object
      showLink={true}
      showingFullColorPalette={true}
      />
    ));
    return (
      <div className={classes.Palette}>
        {/* navbar goes here */}
       
        <Navbar
         
         showSlider={true}
         level={level} 
         changeLevel={this.changeLevel}
         handleChange={this.changeFormat}
          />
        <div className={classes.colors}>
          {/* colors goes here */}
          {colorBoxes}
        </div>

        {/* footer goes here */}
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
export default withStyles(styles)(Palette);
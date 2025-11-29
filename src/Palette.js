import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import {withStyles} from '@material-ui/styles'
import styles from './styles/PaletteStyles'
import PaletteFooter from './PaletteFooter'
import ColorSelectionManager from './ColorSelectionManager'
class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      format:"hex",
      selectedColors: [],
      showSelectionManager: false,
    };
    this.paletteRef = React.createRef();
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
    this.handleSelectColor = this.handleSelectColor.bind(this);
    this.handleRemoveSelectedColor = this.handleRemoveSelectedColor.bind(this);
    this.handleClearSelectedColors = this.handleClearSelectedColors.bind(this);
    this.toggleSelectionManager = this.toggleSelectionManager.bind(this);
  }
  changeLevel(level) {
    this.setState({ level });
  }
  changeFormat(val){
    this.setState({format:val});
  }
  handleSelectColor(color, isSelected) {
    if (isSelected) {
      // Remove color
      this.setState(st => ({
        selectedColors: st.selectedColors.filter(c => c.color !== color.color),
        showSelectionManager: st.selectedColors.length > 1,
      }));
    } else {
      // Add color
      this.setState(st => ({
        selectedColors: [...st.selectedColors, color],
        showSelectionManager: true,
      }));
    }
  }
  handleRemoveSelectedColor(index) {
    this.setState(st => ({
      selectedColors: st.selectedColors.filter((_, i) => i !== index),
      showSelectionManager: st.selectedColors.length > 1,
    }));
  }
  handleClearSelectedColors() {
    this.setState({ selectedColors: [], showSelectionManager: false });
  }
  toggleSelectionManager() {
    this.setState(st => ({ showSelectionManager: !st.showSelectionManager }));
  }
  render() {
    const { colors,paletteName,emoji,id} = this.props.palette;
    const {classes} = this.props;
    const { level, format, selectedColors, showSelectionManager } = this.state;
    
    const colorBoxes = colors[level].map((color) => {
      const isSelected = selectedColors.some(c => c.color === color[format]);
      return (
        <ColorBox 
          key={color.id} 
          background={color[format]} 
          name={color.name} 
          id={color.id}
          paletteId={id}
          showLink={true}
          showingFullColorPalette={true}
          onSelectColor={this.handleSelectColor}
          isSelected={isSelected}
        />
      );
    });
    return (
      <div className={classes.Palette} ref={this.paletteRef}>
        {/* navbar goes here */}
       
        <Navbar
         
         showSlider={true}
         level={level} 
         changeLevel={this.changeLevel}
         handleChange={this.changeFormat}
         palette={this.props.palette}
         paletteElement={this.paletteRef.current}
          />
        <div className={classes.colors}>
          {/* colors goes here */}
          {colorBoxes}
        </div>

        {/* footer goes here */}
        <PaletteFooter paletteName={paletteName} emoji={emoji} colors={colors[level]} />
        
        {/* Color Selection Manager */}
        {showSelectionManager && selectedColors.length > 0 && (
          <ColorSelectionManager
            selectedColors={selectedColors}
            onRemoveColor={this.handleRemoveSelectedColor}
            onClearAll={this.handleClearSelectedColors}
            onClose={this.toggleSelectionManager}
            paletteName={paletteName}
          />
        )}
      </div>
    );
  }
}
export default withStyles(styles)(Palette);
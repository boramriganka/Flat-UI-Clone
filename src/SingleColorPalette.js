import React, { Component } from 'react'
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import ColorSelectionManager from './ColorSelectionManager';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import styles from './styles/PaletteStyles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        // as shades are never changing, no need to use state
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = {
            format: "hex",
            selectedColors: [],
            showSelectionManager: false,
        };
        this.paletteRef = React.createRef();
        this.changeFormat = this.changeFormat.bind(this);
        this.handleSelectColor = this.handleSelectColor.bind(this);
        this.handleRemoveSelectedColor = this.handleRemoveSelectedColor.bind(this);
        this.handleClearSelectedColors = this.handleClearSelectedColors.bind(this);
        this.toggleSelectionManager = this.toggleSelectionManager.bind(this);
      }

    gatherShades(palette, colorToFilterBy) {
        // gather all the shades of a single color
        let shades = [];
        let allColors = palette.colors;
        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            );
        }
        return shades.slice(1);
    }
    
    changeFormat(val) {
        this.setState({ format: val });
    }
    
    handleSelectColor(color, isSelected) {
        if (isSelected) {
            this.setState(st => ({
                selectedColors: st.selectedColors.filter(c => c.color !== color.color),
                showSelectionManager: st.selectedColors.length > 1,
            }));
        } else {
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
        const { classes } = this.props;
        const { format, selectedColors, showSelectionManager } = this.state;
        const { paletteName, emoji, id } = this.props.palette;
        
        const colorBoxes = this._shades.map(color => {
            const isSelected = selectedColors.some(c => c.color === color[format]);
            return (
                <ColorBox 
                    key={color.name} 
                    name={color.name} 
                    background={color[format]}
                    showLink={false}
                    showingFullColorPalette={false}
                    onSelectColor={this.handleSelectColor}
                    isSelected={isSelected}
                />
            );
        });
        return (
            <div className={classes.Palette} ref={this.paletteRef}>
                <Navbar 
                    showSlider={false} 
                    handleChange={this.changeFormat}
                    palette={this.props.palette}
                    paletteElement={this.paletteRef.current}
                />
               <div className={classes.colors}>
                   {colorBoxes}
               <div className={classes.goBack}>
                        <Link to={`/palette/${id}`} className={classes.backButton}>
                            <ArrowBackIcon className={classes.backIcon} />
                            Back
                        </Link>
               </div>
               </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} colors={this._shades} />
                
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
        )
    }
}
export default withStyles(styles)(SingleColorPalette)
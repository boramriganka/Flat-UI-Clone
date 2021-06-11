import React, { Component } from 'react'
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import {Link } from 'react-router-dom'
import {withStyles} from '@material-ui/styles'
import styles from './styles/PaletteStyles'


class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        // as shades are never changing ,  no need to use state
        this._shades = this.getherShades(this.props.palette,this.props.colorId);
        this.state = {
          format:"hex"
        };
        console.log(this._shades)
        this.changeFormat = this.changeFormat.bind(this);
      }

    getherShades(palette,colorToFilterBy){
        // gather all the shades of a single color
        let shades= [];
        let allColors = palette.colors;
        for (let key in allColors){
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            );
        }
        return shades.slice(1);

    }
    changeFormat(val) {
        this.setState({ format: val });
      }

    render() {
        const {classes} = this.props;
        const { format } = this.state;
        const { paletteName, emoji, id } = this.props.palette;
        const colorBoxes = this._shades.map( color => (
            <ColorBox 
            key={color.name} 
            name ={color.name} 
            background={color[format]}
            showLink={false}
            showingFullColorPalette={false}
            />
        ));
        return (

            <div className={classes.Palette}>
                <Navbar showSlider={false}handleChange={this.changeFormat}/>
               <h1>Single Color Boxes</h1>
               <div className={classes.colors}>
                   {colorBoxes}
               <div className={classes.goBack}>
                   <Link to = {`/palette/${id}`}>Go Back </Link>
               </div>
               </div>
               <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}
export default withStyles(styles)(SingleColorPalette)
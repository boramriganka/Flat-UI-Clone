import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from './styles/MiniPaletteStyles'

function MiniPalette(props) {
  const { classes, paletteName, emoji ,colors, handleClick, id, handleDelete} = props;
  
  const deletePalette = (e) => {
    e.stopPropagation();
    handleDelete(id);
  };
  
  const miniColorBoxes = colors.map(color =>{
    return(
      <div 
      className={classes.miniColor} 
      style={{backgroundColor:color.color}}
      key={color.name}
      />
    )
  
  });
  return (
    <div className={classes.root} onClick={() => handleClick(id)}>
      <DeleteIcon 
        className={classes.deleteIcon} 
        style={{ transition: "all 0.3s ease-in-out" }}
        onClick={deletePalette}
      />
      <div className={classes.colors}>
        {/* Mini COLOR BOXES */}
        {miniColorBoxes}
      </div>
      <h5 className={classes.title}>
        {paletteName}
        <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

// it is a HOC
export default withStyles(styles)(MiniPalette);

import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import chroma from 'chroma-js';

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-6px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.3)"
    }
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: props => 
      chroma(props.color).luminance() <= 0.08 
        ? "rgba(255,255,255,0.8)" 
        : "rgba(0,0,0,0.7)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: "500",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  deleteIcon: {
    transition: "all 0.3s ease",
    color: "rgba(0, 0, 0, 0.5)"
  }
};

function DraggableColorBox(props) {
  const { classes, handleClick, name, color } = props;
  return (
    <div 
      className={classes.root} 
      style={{ backgroundColor: color }}
    >
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon 
          className={classes.deleteIcon} 
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default withStyles(styles)(DraggableColorBox); 
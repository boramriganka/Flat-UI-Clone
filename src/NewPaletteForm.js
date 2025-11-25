import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import DraggableColorBox from './DraggableColorBox';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import ExportDialog from './ExportDialog';
import styles from './styles/NewPaletteFormStyles';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const MAX_COLORS = 20;

const SortableColorBox = SortableElement(({ color, name, handleClick }) => (
  <DraggableColorBox 
    color={color} 
    name={name} 
    handleClick={handleClick} 
  />
));

const SortableColorList = SortableContainer(({ colors, removeColor }) => {
  return (
    <div style={{ height: "100%", width: "100%", display: "flex", flexWrap: "wrap" }}>
      {colors.map((color, i) => (
        <SortableColorBox
          index={i}
          key={color.name}
          color={color.color}
          name={color.name}
          handleClick={() => removeColor(color.name)}
        />
      ))}
    </div>
  );
});

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: MAX_COLORS
  };
  
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      colors: this.props.palettes[0].colors,
      exportDialogOpen: false,
    };
    this.paletteRef = React.createRef();
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.openExportDialog = this.openExportDialog.bind(this);
    this.closeExportDialog = this.closeExportDialog.bind(this);
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  addNewColor(newColor) {
    this.setState({
      colors: [...this.state.colors, newColor],
    });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(newPalette) {
    const { paletteName, emoji } = newPalette;
    const newPaletteComplete = {
      paletteName: paletteName,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors,
      emoji: emoji
    };
    this.props.savePalette(newPaletteComplete);
    this.props.history.push("/");
  }

  removeColor(colorName) {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    });
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  }

  clearColors() {
    this.setState({ colors: [] });
  }

  addRandomColor() {
    // Flatten all colors from all palettes
    const allColors = this.props.palettes.map(p => p.colors).flat();
    let rand;
    let randomColor;
    let isDuplicateColor = true;
    
    // Keep trying until we find a unique color
    while(isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicateColor = this.state.colors.some(
        color => color.name === randomColor.name
      );
    }
    
    this.setState({ 
      colors: [...this.state.colors, randomColor] 
    });
  }

  openExportDialog() {
    this.setState({ exportDialogOpen: true });
  }

  closeExportDialog() {
    this.setState({ exportDialogOpen: false });
  }

  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors, exportDialogOpen } = this.state;
    const paletteIsFull = colors.length >= maxColors;

    // Create a temporary palette object for export
    const tempPalette = {
      paletteName: 'My Custom Palette',
      emoji: '🎨',
      colors: colors,
    };

    return (
      <div className={classes.root} ref={this.paletteRef}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon style={{ color: "#e0e0e0" }} />
            </IconButton>
          </div>
          <Divider style={{ backgroundColor: "#555" }} />
          <div className={classes.container}>
            <div className={classes.buttons}>
              <Tooltip title="Remove all colors from the palette" placement="top" arrow>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.clearColors}
                  style={{ backgroundColor: "#f44336", color: "white" }}
                >
                  Clear Palette
                </Button>
              </Tooltip>
              <Tooltip 
                title={paletteIsFull ? "Palette is full (max 20 colors)" : "Add a random color to your palette"} 
                placement="top" 
                arrow
              >
                <span>
                  <Button
                    variant="contained"
                    className={classes.button}
                    onClick={this.addRandomColor}
                    disabled={paletteIsFull}
                    style={{ 
                      backgroundColor: paletteIsFull ? "#888" : "#4caf50",
                      color: "white" 
                    }}
                  >
                    Random Color
                  </Button>
                </span>
              </Tooltip>
            </div>
            
            <Divider style={{ backgroundColor: "#555", margin: "1.5rem 0" }} />
            
            <Tooltip 
              title={colors.length === 0 ? "Add colors to enable export" : "Export palette in CSS, JSON, PNG, and more"} 
              placement="top" 
              arrow
            >
              <span style={{ display: 'block' }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={this.openExportDialog}
                  disabled={colors.length === 0}
                  startIcon={<GetAppIcon />}
                  style={{
                    backgroundColor: colors.length === 0 ? "#888" : "#64B5F6",
                    color: "white",
                    padding: "0.75rem",
                    marginBottom: "1rem",
                  }}
                >
                  Export Current Palette
                </Button>
              </span>
            </Tooltip>
            
            <Typography 
              variant="body2" 
              style={{ 
                color: "#aaa", 
                fontSize: "0.85rem",
                textAlign: "center",
                marginBottom: "1rem"
              }}
            >
              Export your palette before saving or continue editing
            </Typography>
            <ColorPickerForm
              paletteIsFull={paletteIsFull}
              addNewColor={this.addNewColor}
              colors={colors}
            />
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <SortableColorList
            colors={colors}
            removeColor={this.removeColor}
            axis="xy"
            onSortEnd={this.onSortEnd}
            distance={20}
          />
        </main>
        
        <ExportDialog
          open={exportDialogOpen}
          onClose={this.closeExportDialog}
          palette={tempPalette}
          paletteElement={this.paletteRef.current}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
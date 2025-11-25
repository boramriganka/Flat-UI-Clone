import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import Typography from '@material-ui/core/Typography';

const styles = {
  picker: {
    width: "100% !important",
    marginTop: "2rem",
    backgroundColor: "#2a2a2a !important",
    borderRadius: "8px !important",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2) !important",
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "1.2rem",
    backgroundColor: "#64B5F6",
    color: "white",
    "&:hover": {
      backgroundColor: "#42A5F5",
    },
  },
  colorNameInput: {
    width: "100%",
    marginTop: "1rem",
    "& .MuiInputBase-input": {
      color: "#e0e0e0",
    },
    "& .MuiInputLabel-root": {
      color: "#aaa",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#555",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "#64B5F6",
    },
  },
  heading: {
    width: "100%",
    fontSize: "1.5rem",
    color: "#e0e0e0",
    marginTop: "1.5rem",
    marginBottom: "0.5rem",
  },
};

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "#64B5F6",
      newColorName: "",
    };
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", value =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    );
  }

  updateCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit() {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName,
    };
    this.props.addNewColor(newColor);
    this.setState({ newColorName: "" });
  }

  render() {
    const { paletteIsFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;
    
    return (
      <div className={classes.root}>
        <Typography className={classes.heading}>Design Your Palette</Typography>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
          className={classes.picker}
          disableAlpha={true}
        />
        <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
          <TextValidator
            value={newColorName}
            placeholder="Color Name"
            name="newColorName"
            variant="standard"
            margin="normal"
            className={classes.colorNameInput}
            onChange={this.handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'Enter a color name',
              'Color name must be unique',
              'Color already used!',
            ]}
          />
          <Button
            variant="contained"
            type="submit"
            className={classes.addColor}
            disabled={paletteIsFull}
            style={{
              backgroundColor: paletteIsFull ? "#888" : currentColor,
            }}
          >
            {paletteIsFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm); 
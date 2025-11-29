import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import { Link } from 'react-router-dom';
import styles from './styles/PaletteListStyles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import PaletteIcon from '@material-ui/icons/Palette';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import SecurityIcon from '@material-ui/icons/Security';

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      deletingId: ""
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.goToPalette = this.goToPalette.bind(this);
  }

  openDialog(id) {
    this.setState({ openDeleteDialog: true, deletingId: id });
  }

  closeDialog() {
    this.setState({ openDeleteDialog: false, deletingId: "" });
  }

  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }

  handleDelete() {
    this.props.deletePalette(this.state.deletingId);
    this.closeDialog();
  }
  
  render() {
    const { palettes, classes } = this.props;
    const { openDeleteDialog } = this.state;
    
    return (
      <div className={classes.root}>
        {/* Animated Background */}
        <div className={classes.animatedBackground}>
          <div className={classes.gradientOrb1}></div>
          <div className={classes.gradientOrb2}></div>
          <div className={classes.gradientOrb3}></div>
        </div>

        <div className={classes.container}>
          {/* Hero Section */}
          <div className={classes.hero}>
            <div className={classes.heroContent}>
              <h1 className={classes.heroTitle}>
                <span className={classes.gradientText}>Create</span> Beautiful
                <br />
                Color Palettes
              </h1>
              <p className={classes.heroSubtitle}>
                Professional color palette generator with WCAG accessibility checking,
                multi-format export, and intuitive design tools.
              </p>
              <div className={classes.heroButtons}>
                <Button 
                  variant="contained" 
                  component={Link} 
                  to="/palette/new"
                  className={classes.primaryButton}
                  startIcon={<AddIcon />}
                  size="large"
                >
                  Create New Palette
                </Button>
                <Button 
                  variant="outlined" 
                  className={classes.secondaryButton}
                  size="large"
                  onClick={() => {
                    document.querySelector(`.${classes.palettes}`).scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                >
                  Explore Palettes
                </Button>
              </div>

              {/* Feature Cards */}
              <div className={classes.features}>
                <div className={classes.featureCard}>
                  <div className={classes.featureIcon}>
                    <PaletteIcon />
                  </div>
                  <h3>Intuitive Design</h3>
                  <p>Drag & drop colors with real-time preview</p>
                </div>
                <div className={classes.featureCard}>
                  <div className={classes.featureIcon}>
                    <SecurityIcon />
                  </div>
                  <h3>WCAG Compliant</h3>
                  <p>Check accessibility & contrast ratios</p>
                </div>
                <div className={classes.featureCard}>
                  <div className={classes.featureIcon}>
                    <TrendingUpIcon />
                  </div>
                  <h3>Export Anywhere</h3>
                  <p>CSS, JSON, PNG, and more formats</p>
                </div>
              </div>
            </div>
          </div>

          {/* Palettes Section */}
          <div className={classes.palettesSection}>
            <h2 className={classes.sectionTitle}>Your Palettes</h2>
            <div className={classes.palettes}>
              {palettes.map((palette, index) => (
                <div 
                  key={palette.id}
                  className={classes.paletteWrapper}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <MiniPalette 
                    {...palette} 
                    id={palette.id}
                    handleClick={this.goToPalette}
                    handleDelete={this.openDialog}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <Dialog
          open={openDeleteDialog}
          aria-labelledby="delete-dialog-title"
          onClose={this.closeDialog}
          className={classes.dialog}
        >
          <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this palette? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);

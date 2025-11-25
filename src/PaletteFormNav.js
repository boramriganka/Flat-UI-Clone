import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PaletteMetaForm from './PaletteMetaForm';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { DRAWER_WIDTH } from './constants';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
    color: '#f5f5f5',
  },
  title: {
    color: '#f5f5f5',
  },
  navBtns: {
    marginRight: '1rem',
    display: 'flex',
  },
  button: {
    margin: '0 0.5rem',
    color: '#f5f5f5',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
  },
  saveBtn: {
    backgroundColor: '#64B5F6',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#42A5F5',
    },
  },
  link: {
    textDecoration: 'none',
  },
});

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = { formShowing: false };
    this.handleChange = this.handleChange.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  showForm() {
    this.setState({ formShowing: true });
  }

  hideForm() {
    this.setState({ formShowing: false });
  }

  render() {
    const { classes, open, palettes, handleSubmit, handleDrawerOpen } = this.props;
    const { formShowing } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap className={classes.title}>
              Create A Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            <Link to="/" className={classes.link}>
              <Button
                variant="contained"
                className={classes.button}
              >
                Go Back
              </Button>
            </Link>
            <Button
              variant="contained"
              onClick={this.showForm}
              className={`${classes.button} ${classes.saveBtn}`}
            >
              Save Palette
            </Button>
          </div>
        </AppBar>
        {formShowing && (
          <PaletteMetaForm
            palettes={palettes}
            handleSubmit={handleSubmit}
            hideForm={this.hideForm}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav); 
import { DRAWER_WIDTH } from '../constants';

const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
  root: {
    display: "flex",
    backgroundColor: "#121212",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#1a1a1a",
    color: "#e0e0e0",
    padding: "1rem",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  button: {
    margin: "0.5rem",
  },
});

export default styles;

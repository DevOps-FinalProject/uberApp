import React from 'react';
import clsx from 'clsx';
import { Router, Route, Switch, Link} from "react-router-dom";
import { createBrowserHistory } from "history";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayersIcon from '@material-ui/icons/Layers';



// import your components:
 import Home from "../pages/Home";
import THome from "../pages/Uber/AllBookings";
import Compose from "../pages/Booking/Booking";
import Login from "../pages/Booking/Login";
import Signup from "../pages/Booking/Signup";
import AddBus from "../pages/Booking/AddBus";
import AdminDashboard from "../pages/Booking/AdminD";
import CustomerDashboard from "../pages/Booking/CustomerDashboard";
import PageNotFound from "../pages/PageNotFound";

const drawerWidth = 240;
const history = createBrowserHistory();

// css
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  drawerPaperCollapsed: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(0),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  footer: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'grey',
    color: 'white',
    textAlign: 'center',
    fontStyle: 'italic',
  },
}));



export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [collapsed, setCollapsed] = React.useState(false);
  const [title, setTitle] = React.useState('Uber Bus');


  return (
    <div className={classes.root}>
      <CssBaseline />

      {/* This is the header AppBar */}
      

      {/* The Router component routes URLs to your components */}
      <Router history={history} title={title} >

        {/* Drawers are left pane menu items in React-speak */}
        
        
        {/* This is your mission control: Matches URLs above to your components */}
        <main className={classes.content}>

          {/* menu paths */}
          <Switch>
          <Route exact path="/" component={Login} /> 
          <Route path="/listbooks" component={THome} />
          <Route path="/book" component={Compose} />
          <Route exact path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/signup" component={Signup} />
          {/* <Route path="/addbus" component={AddBus} /> */}
          <Route path="/admindash" component={AdminDashboard} />
          <Route path="/customdash" component={CustomerDashboard} />
          <Route path="/reacttest" >Hello from React App</Route>
          <Route component={PageNotFound} />
          </Switch>
          
          {/* <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/password_reset" component={PasswordReset} />
          <Route path="/password_change" component={PasswordChange} /> */}
          {/* <Route path="/activity"><ActivityHome /></Route> */}
        </main>
        
      </Router>
      
      {/* Whatever you put here will appear on all your pages, style appropriately! */}
    </div>
  );
}

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AddBus from "./AddBus";
import ViewBuses from "./ViewBuses";
import BookBus from "./BookBus";
import ViewBookings from "./ViewBookings";
import ViewCustomerBookings from "./ViewCustomerBookings"
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const history = useHistory()
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = (event) => ()=> { 
    // setAnchorEl(null);
    history.push("/login")
    console.log("Hello")
    }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Book Bus" href="/addbus" {...a11yProps(0)} />
          <LinkTab label="View Buses" href="/trash" {...a11yProps(1)} />
          <LinkTab label="Your Bookings" href="/spam" {...a11yProps(2)} />
          <IconButton aria-label="display more actions"  color="inherit" onClick={handleClose}>
            <Button variant="contained" color="primary" onClick={handleClose()}>
                Logout
            </Button>
          </IconButton>
        </Tabs>
      </AppBar>
      
      <TabPanel value={value} index={0}>
        <BookBus/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ViewCustomerBookings classes={{card:"card",root:"root",media:"media"}}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <ViewCustomerBookings/>
      </TabPanel>
    </div>
  );
}
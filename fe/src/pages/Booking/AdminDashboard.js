import React from 'react';
import {Toolbar} from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
// import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from '@material-ui/core';

const styleDiv = {
  padding: '0px 0px',
};

const styleToolbar = {
  background: 'white',
  padding: '0px',
};

const styleUber = {
  margin: '0px', 
};

const styleTabs = {
  marginLeft: '28px',
  background: 'white',
};

const StyleTab = {
  TabLeft : {
  padding: '0px 20px',
  borderTop: '4px',
  background: 'white',
  color: 'black',
  textTransform: 'capitalize',
  },
  TabRight: {
    padding: '0px',
    margin: '0px',
    borderTop: '4px',
    background: 'white',
    color: 'black',
  },
};

const styleInkBar = {
  background:'white',
};

export default class AdminDashboard extends React.Component {

  render() {
    return (
      <div style={styleDiv}>
        <Toolbar style={styleToolbar}>
          <ToggleButtonGroup>
            {/* <FlatButton 
              label='Uber Bus Service' 
              labelStyle={{ fontSize: 'larger' }}
              hoverColor='white'
              style= {styleUber}
              href="/"
            />  */}
            <Tabs style={styleTabs} inkBarStyle={styleInkBar}>
              <Tab label="Add a Bus" style={StyleTab.TabLeft} href="/addbus">
              </Tab>
              <Tab label="View All Buses" style={StyleTab.TabLeft} href="/viewBuses">
              </Tab>
              <Tab label="Delete A Bus" style={StyleTab.TabLeft} href="/deleteBus">
              </Tab>
              <Tab label="View Bookings" style={StyleTab.TabLeft} href="/yourRides">
              </Tab>
            </Tabs> 
          </ToggleButtonGroup>
          <ToggleButtonGroup>
            {/* <FlatButton label="Log out" style={StyleTab.TabRight}  href="/Logout"/> */}
          </ToggleButtonGroup>
        </Toolbar>
      </div>  
    );
  }
}

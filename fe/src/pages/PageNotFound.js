import React from "react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	root: {
	  display: "flex",
	  flexWrap: "wrap",
	  justifyContent: "space-around",
	  overflow: "hidden",
	  backgroundColor: theme.palette.background.paper,
	  marginTop: '100px'
	}
  });

const PageNotFound = (props) =>{
	const { classes } = props;
	return(
		<div className={classes.root}>
			<h1>This Page does not exists...Please Go back to HomePage</h1>
			<NavLink to="/">Go Back</NavLink>
		</div>
	);
};

PageNotFound.propTypes = {
	classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(PageNotFound);
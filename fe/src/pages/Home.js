import React from "react";
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

function Home(props) {
  const { classes } = props;

  return (
      <div className={classes.root}>
        <img src={"https://play-lh.googleusercontent.com/2ch1fQyPoEffpWdRdSbN1Usj5VsDYktrjO3X4ZGhOzmcxAelJCatY7wDEKqi2e3eV_cg"}></img>
      </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);

import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
// import TweetList from "./TweetList";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core/";
//import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    width:350,
    // maxWidth: 500,
    paddingTop:40
  },
  media: {
    height: 140,
    paddingTop:300
  },
  card: {
    flexGrow: 1,
    padding: theme.spacing(2)
}
}));

const THome = () => {
  const classes = useStyles();
  const [tweets, setTweets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://34.194.238.35:5000/bookings-results");
      const { results } = await res.json();
      console.log(results);
      setTweets([...results]);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    // <ScrollView noSpacer={true} noScroll={true} style={styles.container}>
    //   {loading ? (
    //     <ActivityIndicator
    //       style={[styles.centering]}
    //       color="#ff8179"
    //       size="large"
    //     />
    //   ) : (
        // <TweetList tweets={tweets} />
        <div className={classes.card}>
        <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
        >
            {
        tweets.map((link) => (
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.root}>
              <CardMedia
                className={classes.media}
                image={
                  "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ieN2q3c75kbM/v0/1000x-1.jpg"
                }
                title="UBER BUS"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {link.user}
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                  Source : {link.source}
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                  Destination : {link.destination}
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                  Date of Journey : {link.date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        </Grid>
    </div>
      
    //   )}
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
    marginTop: "60px",
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    height: "100vh",
  },
});

export default THome;

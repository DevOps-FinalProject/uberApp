import React from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Cookies from "universal-cookie";
import DeleteIcon from "@material-ui/icons/Delete";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Grid } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
require("dotenv").config();
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = (theme) => ({
  root: {
    width: "50%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {},
  media: {
    height: 140,
    paddingTop: 300,
  },
  card: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
});

export default class ViewCustomerBookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      open:false
    };
  }

  async componentDidMount() {
    const cookies = new Cookies();
    const authToken = await cookies.get("authToken");
    const username = await cookies.get("c-username");
    console.log("Token");
    console.log(username);
    const auth = { headers: { "x-auth-token": authToken } };
    const getAllBusUrl = process.env.REACT_APP_PYTHON_API_URL + `/trip/booking`;

    const userDetails = {
      user: username,
      authToken: authToken,
    };
    axios
      .post(getAllBusUrl, userDetails)
      .then((res) => {
        // alert(JSON.stringify(res.data));
        this.setState({ items: res.data });
      })
      .catch((e) => {
        alert(e.response.data);
      });
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({open:false})
  };

  deleteItem(i, itemp) {
    console.log(itemp._id);
    console.log(itemp.user);
    // axios
    //       .delete(process.env.REACT_APP_PYTHON_API_URL+"/trip/delete/"+itemp.user+"/"+itemp._id)
    //       .then(response => {
    //         console.log(response);
    //         alert(" Deleted Succesfully");
    //       })
    //       .catch(error => {
    //         alert("ERROR: Please check your User Bus id");
    //         console.log(error);
    //       });
    let url =
      process.env.REACT_APP_PYTHON_API_URL +
      "/trip/delete/" +
      itemp.user +
      "/" +
      itemp._id;
    console.log("Received values of form: ", itemp);
    axios
      .delete(url)
      .then((response) => {
        console.log(response);
        this.setState({open:true})
        console.log(" Booking is cancelled");
      })
      .catch((error) => {
        alert("ERROR: Please check your User name/Booking id");
        console.log(error);
      });
    
    const { items } = this.state;
    console.log("Indelete");
    console.log(itemp);
    items.splice(i, 1);
    this.setState({ items });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.card}>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {this.state.items.map((item, i) => (
            <Grid item xs={8} sm={6} md={4}>
              <Card style={{ width: 450, height: 430 }}>
                <CardMedia
                  style={{ height: 0, paddingTop: "36%" }}
                  image={
                    item.bus.start == "Boston"
                      ? "https://www.alux.com/wp-content/uploads/2016/06/752-Elegant-Lady-Exterior-Slides-Out-Spotlight-version.jpg"
                      : "https://i0.wp.com/cwblog.sfo2.digitaloceanspaces.com/2017/09/27101916/newell.jpg?ssl=1"
                  }
                  title="UBER BUS"
                />
                <CardContent>
                  {/* <Typography gutterBottom variant="h5" component="h2">
                  {item._id}
                </Typography> */}
                  <Typography gutterBottom variant="h6" component="h6">
                    User : {item.user}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h6">
                    Source : {item.bus.start}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h6">
                    Destination : {item.bus.end}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h6">
                    Date : {item.bus.date}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h6">
                    Seats : {item.seats}
                  </Typography>
                  <Button
                    style={{ float: "right" }}
                    onClick={this.deleteItem.bind(this, i, item)}
                    color="secondary"
                  >
                    Cancel booking
                  </Button>
                  <br />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success">
            Booking is cancelled!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

ViewCustomerBookings.propTypes = {
  classes: PropTypes.object.isRequired,
};

const StyledApp = withStyles(styles)(ViewCustomerBookings);

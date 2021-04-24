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
require("dotenv").config();
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = theme => ({
  root: {
    display: "flex",
    // width: "100%",
    // marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    width: "100%",
    // display: 'block',
    // tableLayout: 'fixed',
    overflowX: "auto",
  },
  TableCell:{
    whiteSpace: 'nowrap'
  }
});

class ViewBookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  async componentDidMount() {
    const cookies = new Cookies();
    const authToken = await cookies.get("authToken");
    console.log("Token");
    const auth = { headers: { "x-auth-token": authToken } };
    const getAllBusUrl = process.env.REACT_APP_PYTHON_API_URL + `/trip/all`;

    axios
      .get(getAllBusUrl, auth)
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
    axios
          .delete(process.env.REACT_APP_PYTHON_API_URL+"/trip/delete/"+itemp.user+"/"+itemp._id)
          .then(response => {
            console.log(response);
            this.setState({open:true})
            console.log("Deleted Succesfully");
          })
          .catch(error => {
            console.log("ERROR: Please check your User Bus id");
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
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell >Trip Id</TableCell>
                <TableCell >User Email</TableCell>
                <TableCell >Source</TableCell>
                <TableCell >Destination</TableCell>
                <TableCell >Date</TableCell>
                <TableCell >Duration</TableCell>
                <TableCell >Seats</TableCell>
                <TableCell >Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.items.map((item, i) => {
                return (
                  <TableRow key={`row-${i}`}>
                    <TableCell className={classes.TableCell}>{item._id}</TableCell>
                    <TableCell className={classes.TableCell}>{item.user}</TableCell>
                    <TableCell className={classes.TableCell}>{item.bus.start}</TableCell>
                    <TableCell className={classes.TableCell}>{item.bus.end}</TableCell>
                    <TableCell className={classes.TableCell}>{item.bus.date}</TableCell>
                    <TableCell className={classes.TableCell}>{item.bus.duration} Hrs</TableCell>
                    <TableCell className={classes.TableCell}>{item.seats}</TableCell>
                    <TableCell className={classes.TableCell}>
                      <Button
                        onClick={this.deleteItem.bind(this, i, item)}
                        color="secondary"
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success">
            Booking is cancelled!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
// const StyledApp = withStyles(styles)(ViewBookings);
export default withStyles(styles,{withTheme:true})(ViewBookings);

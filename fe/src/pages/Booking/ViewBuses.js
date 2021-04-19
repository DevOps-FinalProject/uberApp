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
const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {},
});

export default class ViewBuses extends React.Component {
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
    const getAllBusUrl = process.env.REACT_APP_PYTHON_API_URL + `/bus/all`;

    axios
      .get(getAllBusUrl, auth)
      .then((res) => {
        // alert(JSON.stringify(res.data));
        this.setState({ items: res.data });
        console.log(this.state.items)
      })
      .catch((e) => {
        alert(e.response.data);
      });
  }

  deleteItem(i, itemp) {
    console.log(itemp._id);

    axios
          .delete(process.env.REACT_APP_PYTHON_API_URL+"/bus/delete/" + itemp._id)
          .then(response => {
            console.log(response);
            alert("Bus Deleted Succesfully");
          })
          .catch(error => {
            alert("ERROR: Please check your User Bus id");
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
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bus Id</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Seats</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.items.map((item, i) => {
                return (
                  <TableRow key={`row-${i}`}>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>{item.start}</TableCell>
                    <TableCell>{item.end}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.duration} Hrs</TableCell>
                    <TableCell>{item.seats}</TableCell>
                    <TableCell>
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
        
      </div>
    );
  }
}
const StyledApp = withStyles(styles)(ViewBuses);

import React from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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
const styles = theme => ({
  root: {
    display: "flex",
    // width: "100%",
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

class ViewBuses extends React.Component {
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
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.TableCell}>Bus Id</TableCell>
                <TableCell className={classes.TableCell}>Source</TableCell>
                <TableCell className={classes.TableCell}>Destination</TableCell>
                <TableCell className={classes.TableCell}>Date</TableCell>
                <TableCell className={classes.TableCell}>Duration</TableCell>
                <TableCell className={classes.TableCell}>Available Seats</TableCell>
                <TableCell className={classes.TableCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.items.map((item, i) => {
                return (
                  <TableRow key={`row-${i}`}>
                    <TableCell className={classes.TableCell}>{item._id}</TableCell>
                    <TableCell className={classes.TableCell}>{item.start}</TableCell>
                    <TableCell className={classes.TableCell}>{item.end}</TableCell>
                    <TableCell className={classes.TableCell}>{item.date}</TableCell>
                    <TableCell className={classes.TableCell}>{item.duration} Hrs</TableCell>
                    <TableCell className={classes.TableCell}>{item.seats}</TableCell>
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
export default withStyles(styles,{withTheme:true})(ViewBuses);

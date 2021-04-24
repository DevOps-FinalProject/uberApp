import { useHistory } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
//import Button from 'material-ui/Button'
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Cookies from "universal-cookie";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
require("dotenv").config();
//import MenuContext from 'material-ui-shell/lib/providers/Menu/Context'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "auto",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(620 + theme.spacing(6))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: `100%`,
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AddBus = () => {
  const classes = useStyles();
  //const intl = useIntl()
  const history = useHistory();
  const [bus_id, setBusId] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [seats, setSeats] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //const { setAuthMenuOpen } = useContext(MenuContext)

  useEffect(() => {
    (async () => {
      const cookies = new Cookies();
      const authToken = await cookies.get("authToken");
      setAuthToken(authToken);
    })();
  }, []);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const busAddUrl = process.env.REACT_APP_PYTHON_API_URL + `/bus/new`;

    const busDetails = {
      authToken: authToken,
      bus_id: bus_id,
      start: start,
      end: end,
      date: date,
      duration: duration,
      seats: seats,
    };

    axios
      .post(busAddUrl, busDetails)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        setOpen(true);
        // history.push("/login");
      })
      .catch((e) => {
        alert(e.response.data);
      });
  };

  return (
    // <Page
    //   pageTitle={intl.formatMessage({
    //     id: 'sign_up',
    //     defaultMessage: ' Sign up',
    //   })}
    //   onBackClick={() => {
    //     history.goBack()
    //   }}
    // >
    <React.Fragment>
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.container}>
          <Typography component="h1" variant="h5">
            {"Add Bus"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              value={bus_id}
              onInput={(e) => setBusId(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="bus_id"
              label={"Bus Id"}
              name="bus_id"
              autoComplete="bus_id"
              autoFocus
            />
            <TextField
              value={start}
              onInput={(e) => setStart(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="start"
              label={"Source"}
              name="start"
              autoComplete="start"
              autoFocus
            />
            <TextField
              value={end}
              onInput={(e) => setEnd(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="end"
              label={"Destination"}
              name="end"
              autoComplete="end"
              autoFocus
            />
            <TextField
              id="date"
              label="Date of Journey"
              type="date"
              onInput={(e) => setDate(e.target.value)}
              defaultValue={date}
              // className={classes.textField}
              inputProps={{
                min: formatDate(new Date()),
              }}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <TextField
              value={duration}
              onInput={(e) => setDuration(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="duration"
              label={"Journey Duration"}
              name="duration"
              autoComplete="duration"
              autoFocus
            />
            <TextField
              value={seats}
              onInput={(e) => setSeats(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="seats"
              label={"Seats"}
              name="seats"
              autoComplete="seats"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {"Add Bus"}
            </Button>
          </form>
        </div>
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Bus Added Successfully!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default AddBus;

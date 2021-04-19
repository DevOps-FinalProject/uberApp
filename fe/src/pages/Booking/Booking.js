import { useHistory } from "react-router-dom";
import { saveAuthorisation, isAuthorised } from "../../utils/auth";
//import Page from 'material-ui-shell/lib/containers/Page/Page'
import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
//import Button from '@material-ui/Button'
import Paper from "@material-ui/core/Paper";
//import MenuContext from 'material-ui-shell/lib/providers/Menu/Context'
import { Link } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { DatePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "auto",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(720 + theme.spacing(6))]: {
      width: 900,
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
}));

const Compose = () => {
  const classes = useStyles();
  const history = useHistory();
  const [tweet, setTweet] = useState("");
  const [username, setUsername] = useState("");
  const [source, setSource] = useState("Source");
  const [destination, setDestination] = useState("Destination");
  const [date, setDate] = useState("");
  const [helperuser, setHelperuser] = useState("");
  const [helpersource, setHelpersource] = useState("");
  const [helperdestination, setHelperdestination] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [errorusername, setErrorusername] = useState(false);
  const [errorsource, setErrorsource] = useState(false);
  const [errordestination, setErrordestination] = useState(false);

  // async launch POST
  const postTweet = async (user, source, destination, date, pic) => {
    const paramdict = {
      user: user,
      source:source,
      destination:destination,
      date:date,
      pic: pic,
    };

    try {
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paramdict),
      };
      const response = await fetch("http://34.194.238.35:5000/book", config);
      //const json = await response.json()
      if (response.ok) {
        //return json
        //return response
        
        console.log("success on send.");
      } else {
        alert("launch: failure on send!");
      }

      try {
        const data = await response.json();
        console.log("on reply:");
        if(data['msg']=="Same Booking Already Present"){
          setError(true);
          setErrorText("Same Booking Already Present");
        }else{
          setError(true);
          setErrorText("Booking Successful");
        }
        console.log(data);
      } catch (err) {
        console.log(err);
        alert("exception on reply!");
      }
    } catch (error) {
      console.log(error);
      alert("exception on send");
    }
  };

  const handleUsername = (event) => {
    if (event.target.value == "") {
      setErrorusername(true);
      setHelperuser("Please enter username");
    } else {
      setErrorusername(false);
      setHelperuser("");
    }
    setUsername(event.target.value);
  };
  const handleSource = (event) => {
    if (event.target.value == "") {
      setErrorsource(true);
      setHelpersource("Please select the origin");
    } else {
      setErrorsource(false);
      setHelpersource("");
    }
    setSource(event.target.value);
  };
  const handleDestination = (event) => {
    if (event.target.value == "") {
      setErrordestination(true);
      setHelperdestination("Please select the destination");
    } else {
      setErrordestination(false);
      setHelperdestination("");
    }
    setDestination(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log("insubmit");
    console.log(source);
    console.log(destination);
    console.log(username);
    console.log(date);
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(username)) {
      setErrorusername(true);
      setHelperuser("Please enter valid email address");
      return;
    }
    if (source== "Source") {
      setErrorsource(true);
      setHelpersource("Please select the origin");
      return;
    }
    if (destination == "Destination") {
      setErrordestination(true);
      setHelperdestination("Please select the destination");
      return;
    }

    

    if (source == destination) {
      setError(true);
      setErrorText("Source and Destination should be different");
      return;
    } else {
      setError(false);
      setErrorText("");
    }

    const priv = true;
    //const username = 'Elon Musk';
    const myArray = ["women", "men"];
    const img_gender = myArray[Math.floor(Math.random() * myArray.length)];
    const img_index = Math.floor(Math.random() * 100) + 1;
    const img_url =
      "https://randomuser.me/api/portraits/" +
      img_gender +
      "/" +
      img_index.toString() +
      ".jpg";

    postTweet(username, source, destination, date, img_url);
    // alert("Booking Done!");
  }
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.container}>
          <Typography component="h1" variant="h5">
            {"Book Bus"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              error={errorusername}
              value={username}
              onInput={handleUsername}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label={"User Name(Email)"}
              name="username"
              autoComplete="username"
              autoFocus
              helperText={helperuser}
            />
            <br/><br/><br/>
            <div style={{ display: "inline", float: "left" }}>
              <div
                style={{
                  display: "inline",
                  float: "left",
                  paddingLeft: "10px",
                }}
              >
                <FormControl
                  className={classes.formControl}
                  error={errorsource}
                >
                  <InputLabel id="demo-simple-select-helper-label">
                    Source City
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={source}
                    onChange={handleSource}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"New York"}>New York</MenuItem>
                    <MenuItem value={"Boston"}>Boston</MenuItem>
                    <MenuItem value={"Portland"}>Portland</MenuItem>
                    <MenuItem value={"Chicago"}>Chicago</MenuItem>
                    <MenuItem value={"Houston"}>Houston</MenuItem>
                    <MenuItem value={"Phoenix"}>Phoenix</MenuItem>
                  </Select>
                  <FormHelperText>{helpersource}</FormHelperText>
                </FormControl>
              </div>
              <div
                style={{
                  display: "inline",
                  float: "right",
                  paddingLeft: "300px",
                }}
              >
                <FormControl
                  className={classes.formControl}
                  error={errordestination}
                >
                  <InputLabel id="demo-simple-select-helper-label">
                    Destination City
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={destination}
                    onChange={handleDestination}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"New York"}>New York</MenuItem>
                    <MenuItem value={"Boston"}>Boston</MenuItem>
                    <MenuItem value={"Portland"}>Portland</MenuItem>
                    <MenuItem value={"Chicago"}>Chicago</MenuItem>
                    <MenuItem value={"Houston"}>Houston</MenuItem>
                    <MenuItem value={"Phoenix"}>Phoenix</MenuItem>
                  </Select>
                  <FormHelperText>{helperdestination}</FormHelperText>
                </FormControl>
              </div>
            </div>
            <br /><br /><br />
            <br /><br /><br />
            <div style={{ paddingLeft: "130px" }}>
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
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {"Book"}
            </Button>
          </form>
          {error&&<FormHelperText error={error}>{errorText}</FormHelperText>}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          ></div>
        </div>
      </Paper>
    </React.Fragment>
  );
};

export default Compose;

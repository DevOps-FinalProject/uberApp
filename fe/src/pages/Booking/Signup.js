import { useHistory } from "react-router-dom";
import { saveAuthorisation, isAuthorised } from "../../utils/auth";
//import { useIntl } from 'react-intl'
//import Page from 'material-ui-shell/lib/containers/Page/Page'
import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
//import Button from 'material-ui/Button'
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Cookies from "universal-cookie";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { Link } from 'react-router-dom'
//import MenuContext from 'material-ui-shell/lib/providers/Menu/Context'

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
}));

const SignUp = () => {
  const classes = useStyles();
  //const intl = useIntl()
  const history = useHistory();
  const [firstname, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  //const { setAuthMenuOpen } = useContext(MenuContext)
  require("dotenv").config();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userRegistrationUrl =
      process.env.REACT_APP_NODE_API_URL + `/user/register`;

    const userDetails = {
      firstName: firstname,
      lastName: lastName,
      phone: phone,
      email: email,
      password: password,
      userRole: userRole,
    };

    axios
      .post(userRegistrationUrl, userDetails)
      .then((res) => {
        alert(JSON.stringify(res.data));
        history.push("/login");
      })
      .catch((e) => {
        alert(e.response.data);
      });
  };

  const handleUserRole = (event) => {
    setUserRole(event.target.value);
  };

  const authenticate = (user) => {
    saveAuthorisation(user);
    let _location = history.location;
    let isAuth = isAuthorised();
    //setAuthMenuOpen(false)
    if (isAuth) {
      let _route = "/home";
      if (_location.state && _location.state.from) {
        _route = _location.state.from.pathname;
        history.push(_route);
      } else {
        history.push(_route);
      }
    }
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
    <div style={{overflow:'hidden'}}>
      <div style={{float:'left',paddingLeft:"130px",paddingTop:"100px"}}>
        <img src={"https://play-lh.googleusercontent.com/2ch1fQyPoEffpWdRdSbN1Usj5VsDYktrjO3X4ZGhOzmcxAelJCatY7wDEKqi2e3eV_cg"}></img>
      </div>
      <div style={{float:'left',paddingLeft:"190px"}}>
    <React.Fragment>
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.container}>
          <Typography component="h1" variant="h5">
            {"Sign up"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              value={firstname}
              onInput={(e) => setFirstname(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstname"
              label={"Firstname"}
              name="firstname"
              autoComplete="firstname"
              autoFocus
            />
            <TextField
              value={lastName}
              onInput={(e) => setLastName(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label={"LastName"}
              name="lastName"
              autoComplete="lastName"
              autoFocus
            />
            <TextField
              value={phone}
              onInput={(e) => setPhone(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label={"Phone"}
              name="phone"
              autoComplete="phone"
              autoFocus
            />
            <TextField
              value={email}
              onInput={(e) => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={"Email"}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label={"Password"}
              name="password"
              autoComplete="password"
              autoFocus
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label">
                Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select"
                value={userRole}
                fullWidth={true}
                onChange={handleUserRole}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"customer"}>Customer</MenuItem>
                <MenuItem value={"admin"}>Admin</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {"Sign up"}
            </Button>
          </form>
        </div>
        <Link to="/login">Login</Link>
      </Paper>
      
    </React.Fragment>
    </div>
    </div>
  );
};

export default SignUp;

import { useHistory } from "react-router-dom";
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
import axios from "axios";
import Cookies from "universal-cookie";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

require("dotenv").config();

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// save keys to local storage
const localStorageAuthKey = "twtr:auth";
function saveAuthorisation(keys) {
  if (typeof Storage !== "undefined") {
    try {
      localStorage.setItem(localStorageAuthKey, JSON.stringify(keys));
    } catch (ex) {
      console.log(ex);
    }
  } else {
    // No web storage Support :-(
  }
}
function getAuthorisation() {
  if (typeof Storage !== "undefined") {
    try {
      var keys = JSON.parse(localStorage.getItem(localStorageAuthKey));
      return keys;
    } catch (ex) {
      console.log(ex);
    }
  } else {
    // No web storage Support :-(
  }
}
function logout() {
  if (typeof Storage !== "undefined") {
    try {
      localStorage.removeItem(localStorageAuthKey);
    } catch (ex) {
      console.log(ex);
    }
  } else {
    // No web storage Support :-(
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
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
    // padding: theme.spacing.unit*2
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
  buttonPadding: {
    //padding: '30px',
    marginBottom: "30px",
  },
}));

const SignIn = (props) => {
  // const {classes} = props;
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);

  // we submit username and password, we receive
  // access and refresh tokens in return. These
  // tokens encode the userid
  const handleSubmit = async (event) => {
    event.preventDefault();

    const cookies = new Cookies();
    console.log("API " + process.env.REACT_APP_NODE_API_URL);
    const loginUrl = process.env.REACT_APP_NODE_API_URL + `/user/login`;

    const login = {
      email: username,
      password: password,
    };

    axios
      .post(loginUrl, login)
      .then((res) => {
        cookies.set("authToken", res.headers["x-auth-token"], { path: "/" });
        cookies.set("c-username", res.data.email, { path: "/" });
        console.log(JSON.stringify(res.data));
        console.log(res.data.userRole);
        if (res.data.userRole === "admin") {
          history.push("/admindash");
        } else if (res.data.userRole === "customer") {
          history.push("/customdash");
        }
        setOpen(false);
      })
      .catch((e) => {
        setOpen(true);
        console.log(e.response.data);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // we submit our tokens and receive
  // a refreshed a renewed access
  // token unless the refresh token
  // has expired

  // Logout attempt
  const handleSignOut = () => {
    logout();

    // back to landing page!
    history.push("/");
  };

  return (
    // <div className={classes.root}>
    //   <Grid spacing={24}
    //   container
    //   // spacing={2}
    //   direction="row"
    //   justify="flex-start"
    //   alignItems="flex-start">
    //     <Grid item xs={12} sm={6} md={3}>
    //       <img src={"https://play-lh.googleusercontent.com/2ch1fQyPoEffpWdRdSbN1Usj5VsDYktrjO3X4ZGhOzmcxAelJCatY7wDEKqi2e3eV_cg"}></img>
    //     </Grid>
    //     <Grid item xs={12} sm={6} md={3}>
    //       <Paper className={classes.paper} elevation={6}>
    //       <div className={classes.container}>
    //       <Typography component="h1" variant="h5">
    //           {'Sign In'}
    //         </Typography>
    //         <Typography gutterBottom>Login using username and password</Typography>
    //         <form className={classes.form} onSubmit={handleSubmit} noValidate>
    //           <TextField
    //             value={username}
    //             onInput={(e) => setUsername(e.target.value)}
    //             variant="outlined"
    //             margin="normal"
    //             required
    //             fullWidth
    //             id="username"
    //             label={'Username'}
    //             name="username"
    //             autoComplete="username"
    //             autoFocus
    //           />
    //           <TextField
    //             value={password}
    //             onInput={(e) => setPassword(e.target.value)}
    //             variant="outlined"
    //             margin="normal"
    //             required
    //             fullWidth
    //             name="password"
    //             label={'Password'}
    //             type="password"
    //             id="password"
    //             autoComplete="current-password"
    //           />
    //           <Button
    //             type="submit"
    //             fullWidth
    //             variant="contained"
    //             color="primary"
    //             className={classes.submit}
    //           >
    //             {'Sign in'}
    //           </Button>
    //         </form>

    //         <div
    //           style={{
    //             display: 'flex',
    //             flexDirection: 'row',
    //             width: '100%',
    //             justifyContent: 'space-between',
    //           }}
    //         >
    //         </div>
    //       </div>
    //       <Link to="/signup">Register</Link>
    //     </Paper>
    //     </Grid>
    //   </Grid>
    // </div>

    <div>
      <Grid
        spacing={24}
        container
        // spacing={2}
        // direction="row"
        justify="center"
        // alignItems="flex-start"
        // alignItems="center"
      >
        <Grid item spacing={12} xs={12} sm={6} md={6}>
          <div style={{float:'left',paddingLeft:"130px",paddingTop:"100px"}}>
          <img
            src={
              "https://play-lh.googleusercontent.com/2ch1fQyPoEffpWdRdSbN1Usj5VsDYktrjO3X4ZGhOzmcxAelJCatY7wDEKqi2e3eV_cg"
            }
          ></img>
          </div>
        </Grid>
        <Grid item spacing={12} xs={12} sm={6} md={6}>
          <div style={{float:'left',paddingLeft:"150px",paddingTop:"120px"}}>
          <React.Fragment>
            <Paper className={classes.paper} elevation={6}>
              <div className={classes.container}>
                <Typography component="h1" variant="h5">
                  {"Uber Sign In"}
                </Typography>
                <Typography gutterBottom>
                  Login using username and password
                </Typography>
                <form
                  className={classes.form}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <TextField
                    value={username}
                    onInput={(e) => setUsername(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label={"Username"}
                    name="username"
                    autoComplete="username"
                    autoFocus
                  />
                  <TextField
                    value={password}
                    onInput={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label={"Password"}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    {"Sign in"}
                  </Button>
                </form>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                ></div>
              </div>
              <Link to="/signup">Register</Link>
            </Paper>
          </React.Fragment>
          </div>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Please check your Username or Password!
        </Alert>
      </Snackbar>
    </div>
  );
};

// SignIn.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default SignIn;
// export default withStyles(useStyles)(SignIn);

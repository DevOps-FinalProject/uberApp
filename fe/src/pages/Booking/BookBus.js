import { useHistory } from 'react-router-dom'
//import Page from 'material-ui-shell/lib/containers/Page/Page'
import React, { useState, useContext,useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
//import Button from '@material-ui/Button'
import Paper from '@material-ui/core/Paper'
//import MenuContext from 'material-ui-shell/lib/providers/Menu/Context'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'universal-cookie';
import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
require('dotenv').config();

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
// save keys to local storage
const localStorageAuthKey = 'twtr:auth';
function saveAuthorisation(keys) {
  if (typeof Storage !== 'undefined') {
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
  if (typeof Storage !== 'undefined') {
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
  if (typeof Storage !== 'undefined') {
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
  paper: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(620 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: `100%`,
  },
  buttonPadding: {    
    //padding: '30px',  
    marginBottom: '30px', 
  },
}))


const SignIn = () => {
  const classes = useStyles()
  const history = useHistory()
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [buses,setBuses] = useState(null)
  const [isBusAvailable,setIsBusAvailable] = useState(false)
  const [isRes,setIsRes] = useState(false)
  const [date,setDate] = useState('')
  const [open, setOpen] = React.useState(false);
  const [snacopen, setSnacopen] = React.useState(false);
  const [bookItem,setBookItem] = useState(null)
  const [authToken,setAuthToken] = useState(null)
  const [username,setUsername] = useState('')
  const [seats,setSeats] = useState('')

    useEffect(() => {
        (async () => {
        const cookies = new Cookies();
        const authToken = await cookies.get("authToken");
        const username = await cookies.get("c-username");
        setUsername(username);
        setAuthToken(authToken);
        })();
    }, []);

    const handleClickOpen = (item) => {
        console.log(item)
        setBookItem(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
  // we submit username and password, we receive
  // access and refresh tokens in return. These
  // tokens encode the userid
  const handleSubmit = async (event) => {
    event.preventDefault();

    const cookies = new Cookies();
    console.log("API "+process.env.REACT_APP_PYTHON_API_URL)
    const bussearchUrl = process.env.REACT_APP_PYTHON_API_URL+`/trip/search`;

    const bus = {
        start: start,
        end: end,
        date: date
    }
    
   await axios.post(bussearchUrl, bus).then((res) => {
        // cookies.set('authToken', res.headers['x-auth-token'], { path: '/' });
        alert(JSON.stringify(res.data));
        console.log("All buses")
        console.log(res.data);
        
        if(res.data==undefined || res.data==null || res.data.length==0){
            console.log("in if")
            setIsBusAvailable(false)
            setIsRes(true)
        }else{
            console.log("In else")
            setIsBusAvailable(true)
            setBuses(res.data)
            setIsRes(true)
        }
    }).catch((e) => {
        console.log(isRes)
        console.log(isBusAvailable)
        alert(e.res.data);
    });

}

    const handleSnacClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setSnacopen(false);
    };
    


    function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  // we submit our tokens and receive
  // a refreshed a renewed access
  // token unless the refresh token
  // has expired

  // Logout attempt
  const handleSignOut = () => { 
    logout();

    // back to landing page!
    history.push("/");
  }

  const bookBus = async(item)=> {
    console.log("Bookitem")
    console.log(bookItem);
    const cookies = new Cookies();
    const aToken = await cookies.get("authToken");
    const uname = await cookies.get("c-username");
    console.log("Token" + aToken)
    console.log("Username "+uname)
    console.log("Selected seats "+seats)
        const auth = {headers: {'x-auth-token': aToken}};
        const boookingUrl = process.env.REACT_APP_PYTHON_API_URL+`/trip/new`;

        const busDetails = {
            authToken: aToken,
            bus: bookItem._id,
            user: uname,
            seats: seats,
        }
        
        axios.post(boookingUrl, busDetails, auth).then((res) => {
            // alert(JSON.stringify(res.data));
            setOpen(false)
            setSnacopen(true);
            
        }).catch((e) => {
            alert(e.response.data);
        });

        
    // const { items } = this.state;
    // console.log("Indelete");
    // console.log(itemp);
    // items.splice(i, 1);
    // this.setState({ items });
  }
     

  return (
    <React.Fragment>
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.container}>
        <Typography component="h1" variant="h5">
            {'Find buses'}
          </Typography>
          <Typography gutterBottom>Checkout the buses to book</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              value={start}
              onInput={(e) => setStart(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="start"
              label={'Source'}
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
              name="destination"
              label={'Destination'}
              id="destination"
              autoComplete="start"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {'Check'}
            </Button>
          </form>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
          </div>
        </div>
        {/* <Link to="/signup">All buses</Link> */}
      </Paper>
      <br/>
      {isRes&&(isBusAvailable?
      <div>
    {
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
              {buses.map((item, i) => {
                return (
                  <TableRow key={`row-${i}`}>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>{item.start}</TableCell>
                    <TableCell>{item.end}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.duration} Hrs</TableCell>
                    <TableCell>{item.seats}</TableCell>
                    <TableCell>
                      {/* <Button
                        // onClick={deleteItem}
                        
                        color="secondary"
                      >
                        Book
                      </Button> */}
                      <Button variant="outlined" color="primary" onClick={(event) => handleClickOpen(item)}>
                            Book
                        </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>}
      </div>
      :
      <div>
        <Paper className={classes.paper} elevation={6}>
          <h1>Bus is not available</h1>
        </Paper></div>)}


      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Book Bus</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the number seats you want to book
          </DialogContentText>
          <TextField
            autoFocus
            onInput={(e) => setSeats(e.target.value)}
            margin="dense"
            id="name"
            label="Number of Seats"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={bookBus} color="primary">
            Book
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snacopen} autoHideDuration={6000} onClose={handleSnacClose}>
        <Alert onClose={handleSnacClose} severity="success">
          Bus booked successfully!
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}

export default SignIn
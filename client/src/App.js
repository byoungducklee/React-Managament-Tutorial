import React from 'react';

import Customer from './components/Customer'
import './App.css';

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import LinearProgress from '@material-ui/core/LinearProgress';
import {withStyles} from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


const styles = theme => ({
    root: {
        width: '100%',
        minWidth: 1080
    },
    paper: {
      marginLeft: 18,
      marginRight: 18

    },
    
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
    
    progress: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    }
})

class App extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      customers: "",
      completed: 0
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);

    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }


  callApi = async () => {
    const response = await fetch('api/customers');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
    }
  
  progress = () => {
    const { completed } = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed + 1});
  }

  render() {
  const { classes } = this.props;

    // const classes = useStyles();
    // const [completed, setCompleted] = React.useState(0);
    // const [buffer, setBuffer] = React.useState(10);

    // const progress = React.useRef(() => {});
    // React.useEffect(() => {
    //   progress.current = () => {
    //     if (completed > 100) {
    //       setCompleted(0);
    //       setBuffer(10);
    //     } else {
    //       const diff = Math.random() * 10;
    //       const diff2 = Math.random() * 10;
    //       setCompleted(completed + diff);
    //       setBuffer(completed + diff + diff2);
    //     }
    //   };
    // });

    // React.useEffect(() => {
    //   function tick() {
    //     progress.current();
    //   }
    //   const timer = setInterval(tick, 500);

    //   return () => {
    //     clearInterval(timer);
    //   };
    // }, []);

  return (
    <div className={classes.root} >
      
    <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>

    <Paper className={classes.paper} > 
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
      {this.state.customers ?
        this.state.customers.map(c => {
          return (
            <Customer
              key={c.id} 
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
              />  
          );
        }) : 
        
        <TableRow>
          <TableCell colSpan="6" align="center">
            {/* <div className={classes.root}>
            <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} />
            <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} color="secondary" />
            </div>             */}
            <LinearProgress className={classes.progress} variant="buffer"  value={this.state.completed} />
            <LinearProgress className={classes.progress} variant="buffer"  value={this.state.completed} color="secondary" />
          </TableCell>
        </TableRow>
      }
        </TableBody>
      </Table>
    </Paper>
    </div>
  );
  }
}

export default withStyles(styles)(App);

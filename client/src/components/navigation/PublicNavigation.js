import React from "react";
import { history }from "../../routers/AppRouter"
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Serach from '@material-ui/icons/SearchOutlined';



const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));


const PublicNavigation = () => {

    const classes = useStyles();
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              onClick={() => history.push('/')}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <Search />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Clio Library App
            </Typography>
            <Button color="inherit" onClick={() => history.push('/login')}>
              Sign in
            </Button>
            {/* <Link to="/login"><Button color="inherit">Login</Button></Link> */}
          </Toolbar>
        </AppBar>
      </div>
    );
};


export default PublicNavigation;
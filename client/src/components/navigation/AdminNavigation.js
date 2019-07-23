import React, { useState } from 'react';
import { history } from '../../routers/AppRouter';

import { Menu as MenuIcon, AccountCircle } from '@material-ui/icons';


import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import makeStyles from "@material-ui/styles/makeStyles";
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const useStyles = makeStyles(theme => {
  const navHeight = '40px'
    return {
    menuItem: {
      minHeight: 0,
      fontSize: '.8rem'
    },
    appBar: {
      height: navHeight,
    },
    toolBar: {
      height: navHeight,
    },
    toolBarDense: {
      minHeight: navHeight,
    },
    menuButton: {
      padding: '0px',
      margin: "0px"
    },
    menuButtonIcon: {
      padding: '0px',
      margin: "0px"
    }
}});

const AdminNavigation = ({ userName, logout }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open = Boolean(anchorEl);
  

  const { firstName, lastName } = userName;
  function handleAccountMenu(event) {
      setAnchorEl2(event.currentTarget)
  }
  const handleCloseAccountMenu = () => {
      setAnchorEl2(null)
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} height={10}>
        <Toolbar 
          classes={{
            root: classes.toolBar,
            dense: classes.toolBarDense
          }}
          variant="dense"
        >
          <Grid
            container
            justify="space-between"
            direction="row"
            alignItems="center"
          >
            <IconButton
              edge="start"
              className={classes.menuButton}
              onClick={handleMenu}
              color="inherit"
              aria-label="Menu"
              aria-controls="Menu"
            >
              <MenuIcon className={classes.menuButtonIcon}/>
            </IconButton>
            <Menu
              id="Menu"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem className={classes.menuItem} onClick={() => history.push('/')}>Search</MenuItem>
              <MenuItem className={classes.menuItem} onClick={() => history.push('/modify')}>
                Modify categories
              </MenuItem>
              <MenuItem className={classes.menuItem} onClick={() => history.push('/addBook')}>
                Add book
              </MenuItem>
              <MenuItem
              className={classes.menuItem}
                onClick={() =>
                  history.push(
                    '/findBookToUpdate'
                  )
                }
              >
                Modify book
              </MenuItem>
              <MenuItem className={classes.menuItem} onClick={() => history.push('/findUser')}>
                Find user
              </MenuItem>
              <MenuItem className={classes.menuItem} onClick={() => history.push('/createUser')}>
                Create new user
              </MenuItem>
            </Menu>

            <Typography  className={classes.title}>
              Clio Library App
            </Typography>

            <IconButton
              aria-label="Account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleAccountMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl2}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorEl2)}
              onClose={handleCloseAccountMenu}
            >
              <MenuItem button={false} className={classes.menuItem}>
              <Box>
                <Typography>
                Logged as {firstName} {lastName}
                </Typography>

                <Typography>ADMIN</Typography>

            </Box>
              </MenuItem>
              <MenuItem dense className={classes.menuItem} onClick={() => logout()}>Logout</MenuItem>
            </Menu>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(
  undefined,
  { logout }
)(AdminNavigation);

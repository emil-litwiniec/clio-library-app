import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { history } from '../../routers/AppRouter';

import { Menu as MenuIcon, AccountCircle } from '@material-ui/icons';
import {
  AppBar,
  Grid,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  IconButton,
  Typography,
  Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const useStyles = makeStyles(theme => ({
    rightPane: {
        // width: '300px'
    }
}));

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
      <AppBar position="static">
        <Toolbar>
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
              <MenuIcon />
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
              <MenuItem onClick={() => history.push('/')}>Search</MenuItem>
              <MenuItem onClick={() => history.push('/modify')}>
                Modify categories
              </MenuItem>
              <MenuItem onClick={() => history.push('/findUser')}>
                Find user
              </MenuItem>
              <MenuItem onClick={() => history.push('/addBook')}>
                Add book
              </MenuItem>
              <MenuItem
                onClick={() =>
                  history.push(
                    '/updateBook/d30ca801-5a96-4e5a-b73b-2c81c22dd2c8'
                  )
                }
              >
                Modify book
              </MenuItem>
            </Menu>



            <Typography  className={classes.title}>
              Clio Library App
            </Typography>



            {/* <Button color="inherit" onClick={() => logout()}>
              Log out
            </Button> */}

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
              <MenuItem button={false}>
              <Box>
                <Typography>
                Logged as {firstName} {lastName}
                </Typography>

                <Typography>ADMIN</Typography>

            </Box>
              </MenuItem>
              <MenuItem dense onClick={() => logout()}>Logout</MenuItem>
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

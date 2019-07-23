import React from 'react';

import axios from 'axios';

import { connect } from 'react-redux'


import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";


import UserInfo from './UserInfo';
import UserBorrows from './UserBorrows';
import UserBorrowsHistory from './UserBorrowsHistory';
import UserReservations from './UserReservations';

import SearchBookId from './SearchBookId';

class UserOverviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleBorrow = this.handleBorrow.bind(this);
    this.handleProlong = this.handleProlong.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handleRemoveReservation = this.handleRemoveReservation.bind(this);

    this.state = {
      user: {},
      borrows: [],
      borrowsHistory: [],
      reservations: [],
      error: '',
      message: ''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    prevState.message &&
      setTimeout(
        () =>
          this.setState(state => ({
            ...state,
            message: ''
          })),
        4000
      );

    prevState.error &&
      setTimeout(
        () =>
          this.setState(state => ({
            ...state,
            error: ''
          })),
        4000
      );
  }

  componentDidMount() {
    this.updateData();
  }

  updateData() {
    axios({
      method: 'GET',
      url: `${process.env.API_URL ? process.env.API_URL : ''}/api/getData`,
      params: {
        userId: this.props.match.params.userId
      }
    })
      .then(res => {
        console.log('res data: ', res.data);
        this.setState(state => ({
          ...state,
          user: res.data.user,
          borrows: res.data.borrows,
          borrowsHistory: res.data.borrowsHistory,
          reservations: res.data.reservations
        }));
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleReturn(value) {
    axios({
      method: 'PATCH',
      url: `http://localhost:5000/api/returnBook`,
      data: {
        borrowId: value
      }
    })
      .then(res => {
        this.setState(state => ({
          ...state,
          message: 'Book has been successfully returned'
        }));
        this.updateData();
      })
      .catch(err => {
        this.setState(state => ({
          ...state,
          error: 'Unable to return the book'
        }));
        this.updateData();
      });
  }
  handleProlong(value) {
    axios({
      method: 'PATCH',
      url: `${process.env.API_URL ? process.env.API_URL : ''}/api/prolong`,
      data: {
        borrowId: value
      }
    })
      .then(res => {
        this.setState(state => ({
          ...state,
          message: 'Book has been successfully prolonged'
        }));
        this.updateData();
      })
      .catch(err => {
        this.setState(state => ({
          ...state,
          error: 'Unable to prolong the book'
        }));
        this.updateData();
      });
  }

  handleRemoveReservation(value) {
    axios({
      method: 'DELETE',
      url: `${process.env.API_URL ? process.env.API_URL : ''}/api/removeReservation`,
      data: {
        resId: value
      }
    })
      .then(res => {
        this.setState(state => ({
          ...state,
          message: 'Reservation has been removed'
        }));
        this.updateData();
      })
      .catch(err => {
        this.setState(state => ({
          ...state,
          error: 'Unable to remove reservation'
        }));

        this.updateData();
      });
  }

  handleBorrow(value) {
    axios({
      method: 'PUT',
      url: `${process.env.API_URL ? process.env.API_URL : ''}/api/addBorrow`,
      data: {
        userId: this.props.match.params.userId,
        bookId: value
      }
    })
      .then(res => {
        this.setState(state => ({
          ...state,
          message: 'Book has been successfully borrowed'
        }));
        this.updateData();
      })
      .catch(err => {
        console.log(err.message)
        console.log('error', err)
        this.setState(state => ({
          ...state,
          error: 'Unable to borrow the book'
        }));
        this.updateData();
      });
  }
  render() {

    const isAdmin = this.props.isAdmin;
    const userId = this.props.match.params.userId;
    return (
      <div>
        {this.state.user && <UserInfo user={this.state.user} />}
        
        {isAdmin && <Box mt={2}>
        <Typography variant="overline">
          Create a borrow:
        </Typography>
        <Divider />
        <SearchBookId handleSubmit={this.handleBorrow} />
        </Box>}

        {this.state.borrows && (
          <UserBorrows
            borrows={this.state.borrows}
            handleProlong={this.handleProlong}
            handleReturn={isAdmin ? this.handleReturn : null}
          />
        )}
        {this.state.borrowsHistory && (
          <UserBorrowsHistory borrowsHistory={this.state.borrowsHistory} />
        )}

        {this.state.reservations && (
          <UserReservations
            reservations={this.state.reservations}
            handleRemoveReservation={this.handleRemoveReservation}
          />
        )}

      </div>
    );
  }
}


const mapStateToProps = state => ({
  isAdmin: !!state.auth.admin
})

export default  connect(mapStateToProps)(UserOverviewPage);

import React from "react";


import axios from "axios";

import UserInfo from "./UserInfo";
import UserBorrows from "./UserBorrows";
import UserBorrowsHistory from "./UserBorrowsHistory";
import UserReservations from "./UserReservations";

import SearchBookId from "./SearchBookId";

class UserOverviewPage extends React.Component {

    constructor(props) {
        super(props);

        this.handleBorrow = this.handleBorrow.bind(this);
        this.handleProlong = this.handleProlong.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
        this.updateData = this.updateData.bind(this);
        this.handleRemoveReservation = this.handleRemoveReservation.bind(this);

        this.state = {
            // user: {},
            // borrows: [],
            // borrowsHistory: [],
            // reservations: []
        }
        
    }

    updateData() {
        axios({
            method: "GET",
            url: "http://localhost:3000/user/getData",
            params: {
                userId: this.props.match.params.userId
            }
        })
        .then(res => {
            this.setState(state => ({
                ...state,
                user: res.data.user,
                borrows: res.data.borrows,
                borrowsHistory: res.data.borrowsHistory,
                reservations: res.data.reservations

            }))
        })
        .catch(err => {
            console.log(err);
        })
    }


    componentDidMount() {
        this.updateData();

    }

    handleReturn(value){
        axios({
            method: "PATCH",
            url: "http://localhost:3000/admin/returnBook",
            data: {
                borrowId: value
            }
        })
        .then(res => {
            this.updateData();
        })
    }
    handleProlong(value) {

        axios({
            method: "PATCH",
            url: "http://localhost:3000/user/prolong",
            data: {
                borrowId: value
            }
        })
        .then( res => {
            console.log(res);
            this.updateData();
        })
        .catch( err => {
            console.log(err);
            this.updateData();
        })
    }


    handleRemoveReservation(value) {
        axios({
            method: "DELETE",
            url: "http://localhost:3000/user/removeReservation",
            data: {
                resId: value
            }
        })
        .then(res => {
            this.updateData();
        })
    }


    handleBorrow(value) {
        axios({
            method: "PUT",
            url: "http://localhost:3000/admin/addBorrow",
            data: {
                userId: this.props.match.params.userId,
                bookId: value
            }
        })
        .then(res => {
            this.updateData();
        })
    }
    render() {
        const userId = this.props.match.params.userId;
        return (
            <div>
                <Link to="/">Search</Link>
                <h1>User overview page:</h1>
                <h2>{userId}</h2>
                {this.state.user &&
                
                <UserInfo user={this.state.user}/>
                }

                {this.state.borrows &&
                
                <UserBorrows 
                    borrows={this.state.borrows} 
                    handleProlong={this.handleProlong}
                    handleReturn={this.handleReturn}
                 />}
                 {this.state.borrowsHistory &&

                <UserBorrowsHistory 
                    borrowsHistory={this.state.borrowsHistory}
                />}

                {this.state.reservations &&
                
                <UserReservations reservations={this.state.reservations}
                    handleRemoveReservation={this.handleRemoveReservation}/>}

                {<SearchBookId handleSubmit={this.handleBorrow}/>}
            </div>
        )
    }
}

export default UserOverviewPage;
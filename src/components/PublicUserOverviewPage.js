import React from "react";
import { Link } from "react-router-dom";


import axios from "axios";

import UserInfo from "./UserInfo";
import UserBorrows from "./UserBorrows";
import UserBorrowsHistory from "./UserBorrowsHistory";
import UserReservations from "./UserReservations";

import SearchBookId from "./SearchBookId";

class PublicUserOverviewPage extends React.Component {

    constructor(props) {
        super(props);

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

                {/* 
                TODO :
                ----> ADD USER ACCOUNT SETTINGS
                ----> LOGGING ACCOUNT COMPONENT
                */}

                {this.state.borrows &&
                
                <UserBorrows 
                    borrows={this.state.borrows} 
                    handleProlong={this.handleProlong}
                 />}
                 {this.state.borrowsHistory &&

                <UserBorrowsHistory 
                    borrowsHistory={this.state.borrowsHistory}
                />}

                {this.state.reservations &&
                
                <UserReservations reservations={this.state.reservations} 
                    handleRemoveReservation={this.handleRemoveReservation}/>
                }
            </div>
        )
    }
}

export default PublicUserOverviewPage;
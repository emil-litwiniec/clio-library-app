import React from "react";
import axios from "axios";

import TwoPhaseButton from "./TwoPhaseButton";


const UserBorrows = ({borrows, handleProlong, handleReturn}) => {
    console.log('borrows',borrows);
    
    return (
        <div>
            <h2>User borrows: </h2>
            {borrows.map((borrow, idx) => {
                return (
                    <div key={idx}>
                        <p>title: {borrow.title}</p>
                        <p>author: {borrow.author}</p>
                        <p>pubication year: {borrow.pub_year}</p>
                        <p>isbn: {borrow.isbn}</p>

                        <p>taken date: {borrow.taken_date}</p>
                        <p>expected brought date: {borrow.exp_brought_date}</p>
                        <p>prolongs: {borrow.prolongs}</p>
                        <TwoPhaseButton 
                            handleSubmit={handleReturn} 
                            id={borrow.borrow_id}
                            btnName="Return"
                            confirmMessage="Are you sure?"
                        />
                        <TwoPhaseButton 
                            handleSubmit={handleProlong} 
                            id={borrow.borrow_id}
                            btnName="Prolong"
                            confirmMessage="Are you sure?"
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default UserBorrows;
import React from "react";

import TwoPhaseButton from "./TwoPhaseButton";

const UserBorrows = ({borrows, handleProlong, handleReturn}) => {
    
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

                        {handleReturn &&
                            <TwoPhaseButton 
                                handleSubmit={handleReturn} 
                                id={borrow.borrow_id}
                                btnName="Return"
                                confirmMessage="Are you sure?"
                            />
                        }
                        
                        {handleProlong &&
                            <TwoPhaseButton 
                                handleSubmit={handleProlong} 
                                id={borrow.borrow_id}
                                btnName="Prolong"
                                confirmMessage="Are you sure?"
                            />
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default UserBorrows;
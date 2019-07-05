import React from "react";

const UserBorrows = ({borrowsHistory}) => {
    
    return (
        <div>
            <h2>User borrows history: </h2>
            {borrowsHistory.map((borrow, idx) => {
                return (
                    <div key={idx}>
                        <p>title: {borrow.title}</p>
                        <p>author: {borrow.author}</p>
                        <p>pubication year: {borrow.pub_year}</p>
                        <p>isbn: {borrow.isbn}</p>

                        <p>taken date: {borrow.taken_date}</p>
                        <p>expected brought date: {borrow.exp_brought_date}</p>
                        <p>brought date: {borrow.brought_date}</p>
                        <p>prolongs: {borrow.prolongs}</p>
                        
                    </div>
                )
            })}
        </div>
    )
}

export default UserBorrows;
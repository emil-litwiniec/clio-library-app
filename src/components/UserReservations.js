import React from "react";

import TwoPhaseButton from "./TwoPhaseButton";

const UserReservations = ({reservations, handleRemoveReservation}) => {
    
    return (
        <div>
            <h2>User reservations: </h2>
            {reservations.map((reservation, idx) => {
                return (
                    <div key={idx}>
                        <p>title: {reservation.title}</p>
                        <p>author: {reservation.author}</p>
                        <p>pubication year: {reservation.pub_year}</p>
                        <p>isbn: {reservation.isbn}</p>

                        <p>Reservation date: {reservation.res_date}</p>

                    {handleRemoveReservation &&
                        <TwoPhaseButton 
                            btnName="Remove"
                            id={reservation.res_id}
                            handleSubmit={handleRemoveReservation}
                        />
                    }
                        
                    </div>
                )
            })}
        </div>
    )
}

export default UserReservations;
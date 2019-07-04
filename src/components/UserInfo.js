import React from 'react';



const UserInfo = (props) => (
    <div>
        <h3>User info: </h3>
        <p>First name: {props.user.first_name}</p>
        <p>Last name: {props.user.last_name}</p>
        <p>Email: {props.user.email}</p>
        <p>Phone number: {props.user.phone_number}</p>
    </div>
);


export default UserInfo;
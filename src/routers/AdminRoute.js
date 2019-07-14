import React from "react";
import { connect } from "react-redux";

import { Route, Redirect } from "react-router-dom";

import AdminNavigation from "../components/navigation/AdminNavigation";
import PrivateNavigation from "../components/navigation/PrivateNavigation";


export const AdminRoute = ({
    isAuthenticated,
    userName,
    userId,
    isAdmin,
    component: Component,
    path,
    history,
    ...rest
}) => 

     { 
         const privateUser = (props) => {
             if(path === "/user/:userId") {
                 console.log('hey')
                 if(props.match.params.userId === userId) {
                    return (
                    <> 
                        <PrivateNavigation userName={userName} />
                        <Component {...props}/>
                    </>
                    )
                 } else {
                    return <Redirect to="/"/>
                 }
                 props.match.params.userId == userId ? <p>Hejka</p> : <Redirect to="/"/>
             } else {
                 return <Redirect to="/"/>
             }
         }
        return (
        <Route
        path={path}
        component={props =>
    
            isAuthenticated ? (
    
    
                isAdmin ? (
                    <>
                    {console.log('isAdmin')}
                        <AdminNavigation userName={userName}/>
                        <Component {...props} />
                    </>
                ) : (
                    <>
                    {/* {path === '/user/:userId' ? (props.match.params.userId == userId ? 
                    <Component {...props} />
                     : <Redirect to="/"/>) : <Redirect to="/"} */}

                     {privateUser(props)}
                       
                    </>
                )
            ) : (
                
                <Redirect to="/" />
            )
            // isAdmin ? (
            //     <>
            //         <AdminNavigation userName={userName} />
            //         <Component {...props} />
                
                   
            //         </>
            //     ) : (
            //         <Redirect to="/" />
            //     )
            }
        />
        )
    }
    
    
;

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.authenticated,
    isAdmin: !!state.auth.admin,
    userId: state.auth.userId,
    userName: {firstName: state.auth.firstName, lastName: state.auth.lastName}
});

export default connect(mapStateToProps)(AdminRoute);

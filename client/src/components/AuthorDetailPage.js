import React from "react";
import axios from "axios";

import {history} from "../routers/AppRouter"
import { connect } from 'react-redux';

import AuthorDetail from "./AuthorDetail";

class AuthorDetailPage extends React.Component {
    constructor(props) {
        super(props);

        
        this.handleGoBack.bind(this);
        this.state = { 
            results: {},
            error: {}}
    }
    handleGoBack() {
        history.goBack();
    }
    componentDidMount() {
        const { match } = this.props;

            axios({
                method:"post",
                url: `${process.env.API_URL ? process.env.API_URL : ''}/api/getAuthorAndBooks`,
                data: {
                    authorId: match.params.authorId
                }
            })
            .then(res => {
                this.setState((state) => {
                    return {...state, results: {...res}}
                })
            })
            .catch(err => {
                this.setState((state) => {
                    return {...state, error: {err}}
                })
            })
        }

        

    

    render() {
        return (
            <div>
            <h3>Hello, author detail result page!</h3>
                <AuthorDetail {...this.state.results.data} handleGoBack={this.handleGoBack}/>
            
        </div>
        )
    }
}


const mapStateToProps = (state) => ({
    actualQuery: state.actualQuery
})

export default connect(mapStateToProps)(AuthorDetailPage);
import React from "react";
import axios from "axios";

import {history} from "../routers/AppRouter"

import ResultDetail from "./ResultDetail";


class ResultDetailPage extends React.Component {
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
        // console.log(this.props.location)
        // // console.log(history)
        // setTimeout(() => {
        //     history.goBack();
        // }, 3000);
        axios({
            method:"post",
            url: 'http://localhost:3000/getBook/',
            data: {
                bookId: match.params.bookId
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
            <h3>Hello, detail result page!</h3>
            <ResultDetail {...this.state.results.data} handleGoBack={this.handleGoBack}/>
        </div>
        )
    }
}

export default ResultDetailPage;
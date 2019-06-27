import React from "react";
import axios from "axios";

import ResultDetail from "./ResultDetail";


class ResultDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            results: {},
            error: {}}
    }
    componentDidMount() {
        const { match } = this.props;

        axios({
            method:"post",
            url: 'http://localhost:3000/getBook/',
            data: {
                bookId: match.params.bookId
            }
        })
        .then(res => {
            this.setState((state, props) => {
                return {...state, results: {...res}}
            })
        })
        .catch(err => {
            this.setState((state, props) => {
                return {...state, error: {err}}
            })
        })

    }
    render() {
        return (
            <div>
            <h3>Hello, detail result page!</h3>
            <ResultDetail {...this.state.results.data}/>
        </div>
        )
    }
}

export default ResultDetailPage;
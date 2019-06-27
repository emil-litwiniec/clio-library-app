import React from "react";
import axios from "axios";


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
                console.log(state);
                return {...state, results: {...res}}
            })
            console.log(this.state)
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
            <p>{JSON.stringify(this.state.results.data, null, 2)}</p>
        </div>
        )
    }
}

export default ResultDetailPage;
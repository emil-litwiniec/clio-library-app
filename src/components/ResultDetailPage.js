import React from "react";
import axios from "axios";

import {history} from "../routers/AppRouter"
import { connect } from 'react-redux';

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

            axios({
                method:"post",
                url: 'http://localhost:3000/getBook/',
                data: {
                    bookId: match.params.id
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


const mapStateToProps = (state) => ({
    actualQuery: state.actualQuery
})

export default connect(mapStateToProps)(ResultDetailPage);
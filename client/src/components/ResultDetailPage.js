import React from "react";
import axios from "axios";

import {history} from "../routers/AppRouter"
import { connect } from 'react-redux';

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";


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
                url: '/api/getBook/',
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
        // const { title, author} = this.state.results.data;
        // console.log(this.state.results.data)
        return (
            <Grid container display="flex">
                <Grid item xs={12} sm={6}>
                    <Typography variant="h3">
                        {this.state.results.data && this.state.results.data.title}
                    </Typography>
                    <Typography variant="h6">
                        {this.state.results.data && this.state.results.data.author}
                    </Typography>

                </Grid>
                <Grid item xs={12} sm={6}>

                    <ResultDetail {...this.state.results.data} handleGoBack={this.handleGoBack}/>
                </Grid>
            
        </Grid>
        )
    }
}


const mapStateToProps = (state) => ({
    actualQuery: state.actualQuery
})

export default connect(mapStateToProps)(ResultDetailPage);
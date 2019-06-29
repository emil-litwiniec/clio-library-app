import React, { Component } from "react";
import axios from "axios";

import Search from "../components/Search";
import Results from "../components/Results";
import { connect } from "react-redux";

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { results: {},
                        query: ''};
    }
    componentDidMount() {
        if(this.props.actualQuery.query) {
            const {
                value,
                searchIn,
                searchBy,
                yearStart,
                yearEnd,
                titlesOrderBy,
                authorsOrderBy
            } = this.props.actualQuery.query;
            const isSearchInAuthors = searchIn === 'a' ? true : false;
        const searchByParam = isSearchInAuthors ? 'author' : searchBy;
        const order = isSearchInAuthors ? authorsOrderBy : titlesOrderBy ;
        axios({
          method: 'get',
          url: 'http://localhost:3000/search',
          params: {
              query: searchIn,
              col: searchByParam,
              value: value,
              yearStart: yearStart,
              yearEnd: yearEnd,
              order: order
      
        }}, [])
        .then((res) => {
            if(res.config.params.query === 'a' && res.data.message) {
                this.setState((state) => 
                ({message: 'Author not found'}));
            } else {
                this.setState(state => {
                    return {
                        ...state,
                        results: res.data,
                        query: res.config.params.query
                    }
                });
            }
          })
          .catch(err => {
            //   setResults({error: 'Book not found'})
          
          })
        }
    }

    handleSubmit(values) {

        const isSearchInAuthors = values.searchIn === 'a' ? true : false;
        const searchByParam = isSearchInAuthors ? 'author' : values.searchBy;
        const order = isSearchInAuthors ? values.authorsOrderBy : values.titlesOrderBy ;
        axios({
          method: 'get',
          url: 'http://localhost:3000/search',
          params: {
              query: values.searchIn,
              col: searchByParam,
              value: values.value,
              yearStart: values.yearStart,
              yearEnd: values.yearEnd,
              order: order
      
        }})
          .then((res) => {
            if(res.config.params.query === 'a' && res.data.message) {
                this.setState((state) => 
                ({message: 'Author not found'}));
            } else {
                console.log(res);
                this.setState(state => {
                    return {
                        ...state,
                        results: res.data
                    }
                });
            }
          })
          .catch(err => {
            //   setResults({error: 'Book not found'})
          
          })
    }

    render() {
        return (
            <>
                <h2>Clio Library App</h2>

                <Search
                    handleSubmit={this.handleSubmit}
                />
                <Results results={Array.isArray(this.state.results) && this.state.results} />
            </>
        );
             }
}
const mapStateToProps = state => ({
    actualQuery: state.actualQuery
});

export default connect(mapStateToProps, undefined)(MainPage);
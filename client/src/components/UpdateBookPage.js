import React from 'react';
import axios from 'axios';

import { history } from "../routers/AppRouter";

import Typography from "@material-ui/core/Typography";


import BookForm from './BookForm';

class UpdateBookPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.populateResults = this.populateResults.bind(this);
    this.state = {
      done: false,
      results: [],
      error: '',
      message: ''
    };
  }
  
  componentDidMount() {
    this.populateResults();
  }

  componentDidUpdate(prevProps, prevState) {
    prevState.message &&
      setTimeout(
        () =>
          this.setState(state => ({
            ...state,
            message: ''
          })),
        4000
      );

    prevState.error &&
      setTimeout(
        () =>
          this.setState(state => ({
            ...state,
            error: ''
          })),
        4000
      );
  }

  populateResults() {
    const {
      match: { params }
    } = this.props;

    axios({
      method: 'POST',
      url: '/api/getBook',
      data: {
        bookId: params.bookId
      }
    })
      .then(res => {
        this.setState(state => ({
          ...state,
          results: res.data,
          done: true
        }));
      })
      .catch(error => {
        this.setState(state => ({
          ...state,
          error: "Something went wrong..."
        }));
      });
  }


  handleSubmit(values) {
    const data = {
      bookId: this.props.match.params.bookId,
      ...(values.title && { title: values.title }),
      ...(values.authorFirst && { authorFirst: values.authorFirst }),
      ...(values.authorLast && { authorLast: values.authorLast }),
      ...(values.lang && { lang: values.lang }),
      ...(values.isbn && { isbn: values.isbn }),
      ...(values.pubYear && { pubYear: values.pubYear }),
      ...(values.edition && { edition: values.edition }),
      ...(values.series && { series: values.series }),
      ...(values.ukd && { ukd: values.ukd }),
      ...(values.genreId && { genreId: values.genreId })
    };

    axios({
      method: 'PATCH',
      url: '/api/admin/updateBook',
      data: data
    }).then(res => {
      this.setState(state => ({
        ...state,
        message: "Book successfully updated"
      }))
      setTimeout(() => history.push('/'), 3000)
    });
  }

  handleDelete() {
    axios({
      method: 'DELETE',
      url: '/api/admin/removeBook',
      data: {
        bookId: this.props.match.params.bookId
      }
    }).then(res => {
      history.push('/');
    });
  }

  render() {
    return (
      <>
        <Typography variant="overline">Update book:</Typography>
        

        {this.state.done && (
          this.state.message ? <Typography variant="body2">{this.state.message}</Typography> : 
          <BookForm
          values={this.state.results}
          handleSubmit={this.handleSubmit}
          handleDelete={this.handleDelete}
        />
          
        )}
        {this.state.error && <Typography variant="body2">{this.state.message}</Typography>}
      
      </>
    );
  }
}

export default UpdateBookPage;

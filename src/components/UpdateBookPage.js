import React from 'react';
import axios from 'axios';

import BookForm from './BookForm';

class UpdateBookPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      done: false,
      results: [],
      error: []
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    axios({
      method: 'POST',
      url: 'http://localhost:3000/getBook',
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
          error
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
      url: 'http://localhost:3000/admin/updateBook',
      data: data
    }).then(res => {
      console.log(res);
    });
  }

  handleDelete() {
    // TODO: confirm delete
    axios({
      method: 'DELETE',
      url: 'http://localhost:3000/admin/removeBook',
      data: {
        bookId: this.props.match.params.bookId
      }
    }).then(res => {
      // TO DO: history?? take us back
    });
    console.log('book deleted!');
  }

  render() {
    return (
      <>
        <h2>Update book</h2>

        {this.state.done && (
          <BookForm
            values={this.state.results}
						handleSubmit={this.handleSubmit}
						handleDelete={this.handleDelete}
          />
        )}

      </>
    );
  }
}

export default UpdateBookPage;

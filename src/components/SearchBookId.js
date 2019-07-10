import React from "react";
import axios from "axios";

import Autosuggest from 'react-autosuggest';


const getSuggestions = async (value, state) => {

    const suggestionsLength = state.suggestions.length;
    const shouldFetch = suggestionsLength < 10 && suggestionsLength !== 0 ? false : true;

    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let suggestions;
    if(shouldFetch) {
         const res = await axios({
            method: "GET",
            url: "http://localhost:3000/searchBookId",
            params: {
                bookId: value
            }
        });
        const { data } = res;
        suggestions = data;
    } else {
        suggestions = state.suggestions.filter(book => book.book_id.slice(0, inputLength) === value)
    }


    return inputLength === 0 ? [] : suggestions;
    
};

const getSuggestionValue = suggestion => suggestion.book_id;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.book_id}
  </div>
);

class SearchUser extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange (event, { newValue }) {
    this.setState({
      value: newValue
    });
  };

  async onSuggestionsFetchRequested({ value }) {
      
    this.setState({
      suggestions: await getSuggestions(value, this.state)
    });
  };

  onSuggestionsClearRequested () {
    this.setState({
      suggestions: []
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    
    // this.props.history.push(`/user/${this.state.value}`);

    this.props.handleSubmit(this.state.value)

  }
  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Type book id',
      value,
      onChange: this.onChange
    };

    return (
        <form onSubmit={this.handleSubmit}>  
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />

            <button type="submit" >Submit</button>

        </form>

    );
  }
}


export default SearchUser;
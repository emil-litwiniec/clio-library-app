import React, { useEffect } from "react";
import axios from "axios";

import { Add, Search } from "@material-ui/icons";

import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import makeStyles from "@material-ui/styles/makeStyles";

import Autosuggest from 'react-autosuggest';


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing(2),
  },
  submit : {
    margin: theme.spacing(1),
  }
}));





const getSuggestionValue = suggestion => suggestion.book_id;

function renderSuggestion(suggestion) {

    return (
        <MenuItem component="div">
            <div>
                <span>{suggestion.book_id}</span>
               
            </div>
        </MenuItem>
    );
}



export default function IntegrationAutosuggest(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    book: ''
  });

  const [ error, setError ] = React.useState('');
  const [ message, setMessage ] = React.useState('');

  const [lastSuggestions, setLastSuggestions] = React.useState([])

  const [stateSuggestions, setSuggestions] = React.useState([]);

  useEffect(() => {
    if(message) {
      setTimeout(() => setMessage(''), 4000)
    }

    if(!!lastSuggestions.find(suggestion => suggestion.book_id === state.book)) {
      setError('')
    } 
  })

  const handleSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value).then( res =>{ setSuggestions(res); setLastSuggestions(res)})
    
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = (event, { newValue }) => {
      setState({
        ...state,
        book: newValue,
      });
    
  };

  const getSuggestions = async (value) => {
      const suggestionsLength = stateSuggestions.length;
      const shouldFetch = suggestionsLength < 10 && suggestionsLength !== 0 ? false : true;
  
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
      let suggestions;

      const url = props.searchForUpdate ? "/api/searchAllBookId" : "/api/searchBookId";
      if(shouldFetch) {
        const res = await axios({
           method: "GET",
           url,
           params: {
               bookId: value
           }
       });
       const { data } = res;
       suggestions = data;
   } else {
       suggestions = stateSuggestions.filter(book => book.book_id.slice(0, inputLength) === value)
   }
  
  
      return inputLength === 0 ? [] : suggestions;
      
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!!lastSuggestions.find(suggestion => suggestion.book_id === state.book)) {
      props.handleSubmit(state.book);
      setState({book: ''});
      setError('')
      setMessage("Book has been borrowed")
    } else {
      setError('Invalid book id')
    }
  }


  function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;
  
    return (
      <TextField
              variant="outlined"
              error={!!error}
              helperText={error}
              fullWidth
              InputProps={{
                  inputRef: node => {
                      ref(node);
                      inputRef(node);
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit">
                        {props.searchForUpdate ? 
                        <Search /> : 
                        <Add />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  classes: {
                      input: classes.input
                  }
              }}
              {...other}
          />
    );
  }
  return (

    <div className={classes.root}>

      <form onSubmit={(e) => handleSubmit(e)}>
          <Autosuggest
            {...autosuggestProps}
            inputProps={{
              classes,
              id: 'react-autosuggest-simple',
              label: props.searchForUpdate ? 'Find book to update' : 'Add book',
              placeholder: 'Book id',
              value: state.book,
              onChange: handleChange,
            }}
            theme={{
              container: classes.container,
              suggestionsContainerOpen: classes.suggestionsContainerOpen,
              suggestionsList: classes.suggestionsList,
              suggestion: classes.suggestion,
            }}
            renderSuggestionsContainer={options => (
              <Paper {...options.containerProps} square>
                {options.children}
              </Paper>
            )}
          />
        </form>
    </div>
  )


}
import React, { useState} from "react";
import axios from "axios";
import { history } from "../routers/AppRouter"

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button"
import { makeStyles } from '@material-ui/core/styles';

import Autosuggest from 'react-autosuggest';

const useStyles = makeStyles(theme => ({
  root: {
    height: 250,
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





const getSuggestionValue = suggestion => suggestion.id;

function renderSuggestion(suggestion) {

    return (
        <MenuItem component="div">
            <div>
                <span>{suggestion.id}</span>
               
            </div>
        </MenuItem>
    );
}

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

export default function IntegrationAutosuggest() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    user: ''
  });

  const [lastSuggestions, setLastSuggestions] = React.useState([])

  const [stateSuggestions, setSuggestions] = React.useState([]);

  const handleSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value).then( res =>{ setSuggestions(res); setLastSuggestions(res)})
    
    setSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = (event, { newValue }) => {
    setState({
      ...state,
      user: newValue,
    });
  };

  const getSuggestions = async (value) => {
      const suggestionsLength = stateSuggestions.length;
      const shouldFetch = suggestionsLength < 10 && suggestionsLength !== 0 ? false : true;
  
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
      let suggestions;
      if(shouldFetch) {
           const res = await axios({
              method: "GET",
              url: "http://localhost:3000/searchUsers",
              params: {
                  userId: value
              }
          });
          const { data } = res;
          suggestions = data;
      } else {
          suggestions = state.suggestions.filter(user => user.id.slice(0, inputLength) === value)
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

    !!lastSuggestions.find(suggestion => suggestion.id === state.user) && 
    history.push(`/user/${state.user}`);

  }

  return (

    <div className={classes.root}>

      <form onSubmit={(e) => handleSubmit(e)}>
          <Autosuggest
            {...autosuggestProps}
            inputProps={{
              classes,
              id: 'react-autosuggest-simple',
              label: 'Find user',
              placeholder: 'User id',
              value: state.user,
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
        <Button className={classes.submit}variant="outlined"t ype="submit">Submit</Button>
        </form>
    </div>
  )


}



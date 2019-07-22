import React, { useEffect } from "react";
import axios from "axios";
import { history } from "../routers/AppRouter"

import { Search as SearchIcon} from "@material-ui/icons";

import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import makeStyles from "@material-ui/styles/makeStyles";

import Autosuggest from 'react-autosuggest';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '8rem',
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
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
  },
  submit : {
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



export default function IntegrationAutosuggest() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    user: ''
  });
  const [ error, setError ] = React.useState('');


  const [lastSuggestions, setLastSuggestions] = React.useState([])

  const [stateSuggestions, setSuggestions] = React.useState([]);

  useEffect(() => {
    if(!!lastSuggestions.find(suggestion => suggestion.id === state.user)) {
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
              url: `${process.env.API_URL ? process.env.API_URL : ''}/api/searchUsers`,
              params: {
                  userId: value
              }
          });
          const { data } = res;
          suggestions = data;
      } else {
          suggestions = stateSuggestions.filter(user => user.id.slice(0, inputLength) === value)
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


    if(!!lastSuggestions.find(suggestion => suggestion.id === state.user)) {
      setState({user: ''});
      setError('')
      history.push(`/user/${state.user}`);
    } else {
      setError('Invalid user id')
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
                        <SearchIcon />
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
          <form onSubmit={e => handleSubmit(e)}>
              <Autosuggest
                  {...autosuggestProps}
                  inputProps={{
                      classes,
                      id: "react-autosuggest-simple",
                      label: "Find user",
                      placeholder: "User id",
                      value: state.user,
                      onChange: handleChange
                  }}
                  theme={{
                      container: classes.container,
                      suggestionsContainerOpen:
                          classes.suggestionsContainerOpen,
                      suggestionsList: classes.suggestionsList,
                      suggestion: classes.suggestion
                  }}
                  renderSuggestionsContainer={options => (
                      <Paper {...options.containerProps} square>
                          {options.children}
                      </Paper>
                  )}
              />
          </form>
      </div>
  );


}



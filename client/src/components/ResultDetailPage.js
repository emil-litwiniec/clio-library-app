import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ResultDetail from './ResultDetail';

class ResultDetailPage extends React.Component {
  constructor(props) {
		super(props);
		
		this.handleReservation = this.handleReservation.bind(this);
		this.populateData = this.populateData.bind(this);
    this.state = {
      results: {},
      error: {},
      message: ''
    };
	}
	
	componentDidUpdate() {
		this.state.message && setTimeout(() => {
			this.setState(state => ({
				...state, 
				message: ""
			}))
		}, 4000)
	}

	populateData() {
		const { match } = this.props;

    axios({
      method: 'post',
      url: `${process.env.API_URL ? process.env.API_URL : ''}/api/getBook`,
      data: {
        bookId: match.params.id
      }
    })
      .then(res => {
        this.setState(state => {
          return { ...state, results: { ...res } };
        });
      })
      .catch(err => {
        this.setState(state => {
          return { ...state, error: 'Unable to get the data.' };
        });
      });
	}
  componentDidMount() {
    this.populateData();
  }

  handleReservation() {
    const { match } = this.props;

    axios({
      method: 'POST',
      url: `${
        process.env.API_URL ? process.env.API_URL : ''
      }/api/addReservation`,
      data: {
        bookId: match.params.id,
        userId: this.props.userId
      }
    })
      .then(res => {
        this.setState(state => ({
          ...state,
          message: 'Book has been reserved. Reservation lasts for 5 days.'
				}));
				this.populateData();
      })
      .catch(err => {
        this.setState(state => ({
          ...state,
          error: 'Unable to reserve this book.'
				}));
				this.populateData();
      });
  }

  render() {
    return (
			<>
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
          <ResultDetail
            {...this.state.results.data}
            handleReservation={this.handleReservation}
            isUser={this.props.isUser}
          />
        </Grid>
      </Grid>
			{this.state.message && 
			<Typography variant="body2">{this.state.message}</Typography>}
			</>
    );
  }
}

const mapStateToProps = state => ({
  actualQuery: state.actualQuery,
  isUser:
    state.auth.authenticated === true && state.auth.admin === false && true,
  userId: state.auth.userId
});

export default connect(mapStateToProps)(ResultDetailPage);

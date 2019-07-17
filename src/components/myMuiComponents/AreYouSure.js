import React from 'react';

import { Typography, ButtonGroup, Button, Grid } from '@material-ui/core';

export default ({ that, id, props, toTheRight = null }) => (
  <>
    <Grid container>

			<Grid item xs={6}>
				<Typography>Are you sure?</Typography>

			</Grid>


			<Grid item xs={6} className={toTheRight}>
				<ButtonGroup size="small">
					<Button 
						onClick={() => that.handleDelete(props.values[`${id}`])}
						size="small"
					>
						Yes
					</Button>
					<Button
						margin="dense"
						onClick={() =>
							that.setState(state => ({
								...state,
								phase: 1
							}))
						}
					>
						No
					</Button>
				</ButtonGroup>

			</Grid>
		</Grid>
  </>
);

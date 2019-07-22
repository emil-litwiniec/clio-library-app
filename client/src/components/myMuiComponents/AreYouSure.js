import React from 'react';
import clsx from "clsx";

import Typography from "@material-ui/core/Typography"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import makeStyles from "@material-ui/styles/makeStyles"

const useStyles = makeStyles(theme => ({
	gridText: {
		textAlign: "center"
	},
	gridButton: {
		display: "flex",
		justifyContent: "center"
	},
	typo: {
		fontSize: '.8rem'
	}
}))

export default ({ that, id, props, toTheRight = null, handleDelete,  }) => {

	const classes = useStyles();
	return (
  <>
    <Grid container>

			<Grid item xs={12} className={classes.gridText}>
				<Typography className={classes.typo}>Are you sure?</Typography>

			</Grid>


			<Grid item xs={12} className={clsx(toTheRight ,classes.gridButton)}>
				<ButtonGroup size="small">
					<Button 
						onClick={handleDelete ? handleDelete : 
							() => that.handleDelete(props.values[`${id}`])}
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
)};

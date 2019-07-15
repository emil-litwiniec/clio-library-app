import React from "react";

import TwoPhaseButton from "./TwoPhaseButton";

import {Typography, Paper, List, ListItem, Grid, Divider} from "@material-ui/core";

const UserReservations = ({reservations, handleRemoveReservation}) => {
    
    return (
			<>
				<Typography> User borrows: </Typography>
				<Paper>
					<List>
						{reservations.map((reservation, idx) => {
							return (
                <Box key={idx}>
                  <ListItem>
                    <Grid container>
                      <Grid item>
                        <Grid container>
                          <Grid item>
                            <Typography>
                              Title: {reservation.title}
                            </Typography>
                            <Typography>
                              Author: {reservation.author}
                            </Typography>
                            <Typography>
                              Publication year:{' '}
                              {reservation.pub_year}
                            </Typography>
                            <Typography>
                              Isbn: {reservation.isbn}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography>
                              Reservation date:{' '}
                              {reservation.res_date}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        {handleRemoveReservation && (
                          <TwoPhaseButton
                            handleSubmit={handleRemoveReservation}
                            id={reservation.res_id}
                            btnName="Remove"
                          />
                        )}
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                </Box>
              );
						})}
					</List>
				</Paper>
			</>
		);
}

export default UserReservations;
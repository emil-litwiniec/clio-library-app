import React from 'react';

import TwoPhaseButton from './TwoPhaseButton';
import {
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Paper
} from '@material-ui/core';

const UserBorrows = ({ borrows, handleProlong, handleReturn }) => {
  return (
    <>
      <Typography> User borrows: </Typography>
      <Paper>
        <List>
          {borrows.map((borrow, idx) => {
            return (
              <Box key={idx}>
                <ListItem>
                  <Grid container>
                    <Grid item>
                      <Grid container>
                        <Grid item>
                          <Typography>Title: {borrow.title}</Typography>
                          <Typography>Author: {borrow.author}</Typography>
                          <Typography>
                            Publication year: {borrow.pub_year}
                          </Typography>
                          <Typography>Isbn: {borrow.isbn}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography>
                            Taken date: {borrow.taken_date}
                          </Typography>
                          <Typography>
                            Expected brought date: {borrow.exp_brought_date}
                          </Typography>
                          <Typography>Prolongs: {borrow.prolongs}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item>
                      {handleReturn && (
                        <TwoPhaseButton
                          handleSubmit={handleReturn}
                          id={borrow.borrow_id}
                          btnName="Return"
                          confirmMessage="Are you sure?"
                        />
                      )}

                      {handleProlong && (
                        <TwoPhaseButton
                          handleSubmit={handleProlong}
                          id={borrow.borrow_id}
                          btnName="Prolong"
                          confirmMessage="Are you sure?"
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
};

export default UserBorrows;

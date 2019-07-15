import React from 'react';

import {
  Box,
  Divider,
  Typography,
  Paper,
  List,
  ListItem
} from '@material-ui/core';

const UserBorrows = ({ borrowsHistory }) => {
  return (
    <>
      <Typography> User borrows history: </Typography>
      <Paper>
        <List>
          {borrowsHistory.map((borrow, idx) => {
            return (
              <Box key={idx}>
                <ListItem>
                  <Box>
                    <Typography>Title: {borrow.title}</Typography>
                    <Typography>Author: {borrow.author}</Typography>
                    <Typography>Pubication year: {borrow.pub_year}</Typography>
                    <Typography>Isbn: {borrow.isbn}</Typography>

                    <Typography>Taken date: {borrow.taken_date}</Typography>
                    <Typography>
                      Expected brought date: {borrow.exp_brought_date}
                    </Typography>
                    <Typography>brought date: {borrow.brought_date}</Typography>
                    <Typography>Prolongs: {borrow.prolongs}</Typography>
                  </Box>
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

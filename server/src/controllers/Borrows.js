import db from '../db/index';
import uuidv4 from 'uuid/v4';
import moment from 'moment';

const Borrows = {
  async add(req, res) {
    if (!req.body.userId || !req.body.bookId) {
      return res.status(400).send({
        message: `Please, provide
            user id and book id.`
      });
    }

    try {
      // Check if book and user exist in the db

      const userQuery = `SELECT id FROM users WHERE id='${req.body.userId}'`;
      const bookQuery = `SELECT book_id FROM books WHERE book_id='${
        req.body.bookId
      }'`;

      const { rows: isUser } = await db.query(userQuery);
      const { rows: isBook } = await db.query(bookQuery);

      if (!isUser[0] || !isBook[0]) {
        return res
          .status(404)
          .send({ message: "Provided data doesn't exist in the database." });
      }

      // Check if book is already borrowed

      const borrowedQuery = `SELECT * 
            FROM borrows
            WHERE book_id = '${req.body.bookId}'`;

      const { rows: isBorrowed } = await db.query(borrowedQuery);

      if (isBorrowed[0]) {
        return res
          .status(400)
          .send({ message: 'The book is already borrowed.' });
      }

      const insertQuery = `INSERT INTO
            borrows(borrow_id ,user_id, book_id, taken_date, exp_brought_date, prolongs)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *`;

      const insertValues = [
        uuidv4(),
        req.body.userId,
        req.body.bookId,
        moment(new Date()),
				moment(new Date()).add(3, 'weeks'),
				0
      ];

      const { rows: insertBorrow } = await db.query(insertQuery, insertValues);

      if (!insertBorrow[0]) {
        return res
          .status(400)
          .send({ message: 'There is something wrong with the borrow.' });
      }

      return res.status(201).send(insertBorrow[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  async bookReturn(req, res) {
    if (!req.body.borrowId) {
      return res
        .status(400)
        .send({ message: 'Please, provide id of the borrow.' });
    }

    const searchIfBorrowed = `SELECT *
        FROM borrows
        WHERE borrow_id='${req.body.borrowId}'`;

    const deleteQuery = `DELETE FROM borrows 
        WHERE borrow_id='${req.body.borrowId}'
        RETURNING *`;

    const insertBorrowsHistoryQuery = `INSERT INTO
            borrows_history(borrow_id ,user_id, book_id, taken_date, exp_brought_date, brought_date, prolongs)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`;
    const setBackQuery = `INSERT INTO
            borrows(borrow_id ,user_id, book_id, taken_date, exp_brought_date)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *`;

    try {
      const { rows: isBrought } = await db.query(searchIfBorrowed);

      if (!isBrought[0]) {
        return res.status(400).send({ message: 'Unable to find the book.' });
      }
      const { rows: deletedBorrow } = await db.query(deleteQuery);

      if (!deletedBorrow[0]) {
        return res
          .status(400)
          .send({ message: 'Unable to delete book from current borrows.' });
      }

      const insertValuesBorrowsHistory = [
        isBrought[0].borrow_id,
        isBrought[0].user_id,
        isBrought[0].book_id,
        isBrought[0].taken_date,
        isBrought[0].exp_brought_date,
				moment(new Date()).format(),
				isBrought[0].prolongs
      ];

      const inserValuesSetBack = [
        isBrought[0].borrow_id,
        isBrought[0].user_id,
        isBrought[0].book_id,
        isBrought[0].taken_date,
				isBrought[0].exp_brought_date,
				isBrought[0].prolongs
      ];

      const { rows: insertBorrowsHistory } = await db.query(
        insertBorrowsHistoryQuery,
        insertValuesBorrowsHistory
      );

      if (!insertBorrowsHistory[0]) {
        // if unable to insert borrow to borrows_history then insert borrow back to borrows
        const { rows: bookSetBack } = await db.query(
          setBackQuery,
          inserValuesSetBack
        );

        if (!bookSetBack[0]) {
          return res.status(400).send({
            message:
              'Unable to set borrow in borrows history. Borrow has been deleted.'
          });
        }
        return res.status(400).send({
          message:
            'Unable to set borrow in borrows history. Borrow has been restored.'
        });
      }

      return res.status(200).send({ message: 'The book has been returned' });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  async remove(req, res) {
    if (!req.body.borrowId) {
      return res
        .status(400)
        .send({ message: 'Please, provide id of the borrow.' });
    }

    const deleteQuery = `DELETE FROM borrows
        WHERE borrow_id='${req.body.borrowId}'
        RETURNING *`;

    try {
      const { rows } = await db.query(deleteQuery);

      if (!rows[0]) {
        return res
          .status(400)
          .send({ message: 'Something wrong with the query.' });
      }

      return res
        .status(200)
        .send({ message: `Borrow ${req.body.borrowId} has been deleted.` });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  async prolong(req, res) {
    if (!req.body.borrowId) {
      return res
        .status(400)
        .send({ message: 'Please, provide id of the borrow.' });
    }

    const selectQuery = `SELECT prolongs, exp_brought_date
        FROM borrows
        WHERE borrow_id = '${req.body.borrowId}'`;

    try {
      const { rows: prolongAmount } = await db.query(selectQuery);

      if (prolongAmount[0].prolongs >= 3) {
        return res
          .status(400)
          .send({ message: 'You have exceeded maximum amount of prolongs.' });
      }
      const expBroughtDate = prolongAmount[0].exp_brought_date;
      const now = moment(new Date());

      if (now.isAfter(expBroughtDate)) {
        return res.status(400).send({ message: 'Unable to prolong the book.' });
      }

      const prolongQuery = `UPDATE borrows
            SET prolongs = prolongs + 1,
                exp_brought_date = '${moment(expBroughtDate)
                  .add(2, 'w')
                  .format()}'
            WHERE borrow_id = '${req.body.borrowId}'
            RETURNING *`;

      const { rows: prolongs } = await db.query(prolongQuery);

      if (!prolongs[0]) {
        return res.status(404).send({ message: 'Unable to find the borrow.' });
      }

      return res.status(200).send(prolongs[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  }
};

export default Borrows;

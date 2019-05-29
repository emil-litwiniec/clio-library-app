import express from 'express';
import dotenv from 'dotenv';
import '@babel/polyfill';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res) => {
    return res.status(200).send({'message': "initial route is working"})
});

app.listen(3000);

console.log('server is running on port', PORT);
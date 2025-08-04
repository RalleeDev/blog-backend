import express from 'express';
const app = express();
const port = 3000;

import signup  from './auth/signup';
import signin from './auth/signin';

app.get('/', (req, res) => {
    res.send('Hello world');
});
app.use(express.json());

app.use('/auth', signup);
app.use('/auth', signin)

app.listen(port, () => {
    console.log(`Listening on: https://localhost:${port}`);
})
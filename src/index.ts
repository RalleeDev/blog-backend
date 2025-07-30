import express from 'express';
const app = express();
const port = 3000;

import signup  from './auth/signup'

app.get('/', (req, res) => {
    res.send('Hello world');
});
app.use(express.json())

app.use('/auth', signup)

app.listen(port, () => {
    console.log(`Listening on: https://localhost:${port}`);
})
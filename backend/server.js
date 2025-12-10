const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/reviews', require('./routes/reviewRoute'));
app.use('/transactions', require('./routes/transactionRoute'));
app.use('/libraries', require('./routes/libraryRoute'));
app.use('/games', require('./routes/gameRoute'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});
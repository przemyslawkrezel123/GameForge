const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions.js');
const session = require('express-session');
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.use(express.json());

app.use(
    session({
        name: "session_id",
        secret: "super_secret_key",
        resave: false,
        saveUninitialized: false,
        cookie:
        {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

app.use('/auth', require('./routes/authRoute'));
app.use('/reviews', require('./routes/reviewRoute'));
app.use('/transactions', require('./routes/transactionRoute'));
app.use('/libraries', require('./routes/libraryRoute'));
app.use('/games', require('./routes/gameRoute'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});
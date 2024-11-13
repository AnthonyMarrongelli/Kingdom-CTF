const express = require('express');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const cors = require('cors')
const app = express();

/* loading in environment variables */
require('dotenv').config()
app.use(express.json());
app.use(cors({ origin: 'http://localhost:8000' })); /* for debugging */

/* temporary, we will attach a DB later */
const users = {};

/* endpoint for registration */
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.status(400).json({ error: "Username already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = { password: hashedPassword };
    res.status(201).json({ message: `${username} registered!` });
});

/* endpoint for logging in */
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users[username];
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid login credentials!" });
    }

    /* const token = jwt.sign({ username }, process.env.JWT_SECRET); */
    const token = jwt.sign({ username }, 'secret');
    res.json({ token });
});

/* launching server */
app.listen(3000, () => console.log("Server running on http://localhost:3000"));

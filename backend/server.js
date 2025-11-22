// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { run, get, all } = require('./db');
const init = require('./init-schema');
const { generateToken, authenticate, authorize } = require('./middleware/auth');
const audit = require('./utils/audit');

const app = express();
const PORT = process.env.PORT || 5000;
const SALT_ROUNDS = 10;

app.use(cors());
app.use(bodyParser.json());

// initialize DB schema
init().then(() => console.log('DB initialized')).catch(console.error);

// (server implementation as provided earlier - omitted here for brevity)
app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`HRMS backend listening on port ${PORT}`);
});

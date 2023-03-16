require("dotenv").config();
const { query } = require("./db");
const format = require('pg-format');
const startDb = require("./db/start");

(async function () {
    await startDb();
    const { rows } = await query(format("SELECT * FROM %I", "players"));
    console.log(rows);
})();
const { Pool } = require('pg');
const pool = new Pool();
const format = require('pg-format');
const constants = require("./constants.json");

function query(text, params) {
    return pool.query(text, params);
}

function getPlayers() {
    return query(format("SELECT nickname, email, registered, status FROM %I order by registered", constants.PLAYERS));
}

module.exports = { query, getPlayers };

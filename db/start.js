const path = require("path");;
const { Client } = require("pg");
const migrate = require("./migration");
const seed = require("./seed");

module.exports = async function startDb() {
    const client = new Client();
    await client.connect();

    const query = (text, params) => client.query(text, params);
    await migrate(query);
    await seed(query, path.resolve(__dirname, "..", "data" , "players.csv"));

    await client.end();
}
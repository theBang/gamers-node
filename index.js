require("dotenv").config();
const path = require("path");
const { promises: fs } = require("fs");
const { parse } = require("csv-parse");
const { Client } = require("pg");

const NICKNAME = "Ник";
const EMAIL = "Email";
const REGISTERED = "Зарегистрирован";
const STATUS = "Статус";
const ON = "ON";

async function parseCsv(filePath) {
    const content = await fs.readFile(filePath);
    return parse(content, {
        delimiter: ";",
        trim: true,
        columns: true
    });
}

function parseDate(dateString) {
    const dateParts = dateString.split(" ");
    const date = dateParts[0].split(".");
    const time = dateParts[1].split(":");
    const dateUTC = Date.UTC(date[2], date[1] - 1, date[0], time[0], time[1]);

    // Move from ms to seconds precision to fit in integer
    return dateUTC / 1000; 
}

(async function fillTable() {
    const client = new Client();
    await client.connect();

    const tableName = "players";
    const createTableText = `
    CREATE TEMP TABLE IF NOT EXISTS ${tableName} (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        nickname character varying(64) UNIQUE NOT NULL,
        email character varying(320) UNIQUE NOT NULL,
        registered integer NOT NULL,
        status boolean NOT NULL
    );
    `;
    await client.query(createTableText);

    const insertText = `INSERT INTO ${tableName}(nickname, email, registered, status) VALUES($1, $2, $3, $4)`;
    const records = await parseCsv(path.resolve("data", "players.csv"));

    for await (const record of records) {
        console.log(record);
        const values = [
            record[NICKNAME], 
            record[EMAIL], 
            parseDate(record[REGISTERED]), 
            record[STATUS] === ON];
        await client.query(insertText, values);
    }

    const { rows } = await client.query(`SELECT * FROM ${tableName}`);
    console.log(rows);

    await client.end();
})();
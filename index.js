require("dotenv").config();
const path = require("path");
const { promises: fs } = require("fs");
const { parse } = require("csv-parse");
const { Client } = require("pg");
const format = require('pg-format');
const head = require("./data/head.json")

async function parseCsv(filePath) {
    const content = await fs.readFile(filePath);
    return parse(content, {
        delimiter: ";",
        trim: true,
        columns: true
    });
}

(async function fillTable() {
    const client = new Client();
    await client.connect();

    const tableName = "players";
    const createTableText = format(`
    CREATE TEMP TABLE IF NOT EXISTS %I (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        nickname character varying(64) UNIQUE NOT NULL,
        email character varying(320) UNIQUE NOT NULL,
        registered integer NOT NULL,
        status boolean NOT NULL
    );
    `, tableName);
    console.log(createTableText);
    await client.query(createTableText);

    const records = await parseCsv(path.resolve("data", "players.csv"));

    for await (const record of records) {
        console.log(record);
        const insertText = format(`
        INSERT INTO %I(nickname, email, registered, status) VALUES(
            %L, 
            %L, 
            cast(extract(epoch from to_timestamp(%L, 'DD.MM.YYYY HH24:MI')::timestamp) as integer), 
            %L
        );
        `, tableName,
            record[head.NICKNAME],
            record[head.EMAIL],
            record[head.REGISTERED],
            record[head.STATUS] === head.ON
        );
        await client.query(insertText);
    }

    const { rows } = await client.query(format("SELECT * FROM %I", tableName));
    console.log(rows);

    await client.end();
})();
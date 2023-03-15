require("dotenv").config();
const { Client } = require("pg");

(async () => {
    const client = new Client();
    await client.connect();

    const createTableText = `
    CREATE TABLE IF NOT EXISTS players (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        nickname character varying(64) UNIQUE NOT NULL,
        email character varying(320) UNIQUE NOT NULL,
        registered integer NOT NULL,
        status boolean NOT NULL
    );
    `;
    await client.query(createTableText);

    const insertText = "INSERT INTO players(nickname, email, registered, status) VALUES($1, $2, $3, $4)"
    const values = ["ivan", "ivan@mail.ru", 123, true];
    await client.query(insertText, values);

    const { rows } = await client.query("SELECT * FROM players");
    console.log(rows);

    await client.end();
})()
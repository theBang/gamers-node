const format = require('pg-format');

module.exports = async function migrate(query) {
    const createTableText = format(`
    CREATE TABLE IF NOT EXISTS %I (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        nickname character varying(64) UNIQUE NOT NULL,
        email character varying(320) UNIQUE NOT NULL,
        registered integer NOT NULL,
        status boolean NOT NULL
    );
    `, "players");
    console.log(createTableText);
    await query(createTableText);
}
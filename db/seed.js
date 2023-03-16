const { promises: fs } = require("fs");
const { parse } = require("csv-parse");
const format = require('pg-format');
const constants = require("./constants.json");
const head = require("../data/head.json")

async function parseCsv(filePath) {
    const content = await fs.readFile(filePath);
    return parse(content, {
        delimiter: ";",
        trim: true,
        columns: true
    });
}

module.exports = async function seed(query, csvPath) {
    const records = await parseCsv(csvPath);
    await query(format("DELETE FROM %I", constants.PLAYERS));

    for await (const record of records) {
        const insertText = format(`
        INSERT INTO %I(nickname, email, registered, status) VALUES(
            %L, 
            %L, 
            cast(extract(epoch from to_timestamp(%L, 'DD.MM.YYYY HH24:MI')::timestamp) as integer), 
            %L
        );
        `, constants.PLAYERS,
            record[head.NICKNAME],
            record[head.EMAIL],
            record[head.REGISTERED],
            record[head.STATUS] === head.ON
        );
        await query(insertText);
    }
}
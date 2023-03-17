const { promises: fs } = require("fs");
const { parse } = require("csv-parse");
const format = require('pg-format');
const head = require("../data/head.json");
const Player = require("./entity/Player");
const path = require("path");

async function parseCsv(filePath) {
    const content = await fs.readFile(filePath);
    return parse(content, {
        delimiter: ";",
        trim: true,
        columns: true
    });
}

module.exports = async function seed(dataSource) {
    const records = await parseCsv(path.resolve(__dirname, "..", "data", "players.csv"));
    const players = [];
    for await (const record of records) {
        players.push({
            nickname: record[head.NICKNAME],
            email: record[head.EMAIL],
            registered: () => format("cast(extract(epoch from to_timestamp(%L, 'DD.MM.YYYY HH24:MI')::timestamp) as integer)", record[head.REGISTERED]),
            status: record[head.STATUS] === head.ON
        })
    }

    const playerRepo = await dataSource.getRepository(Player);
    await playerRepo.delete({});
    await dataSource
        .createQueryBuilder()
        .insert()
        .into(Player)
        .values(players)
        .orUpdate({
            skipUpdateIfNoValuesChanged: true
        })
        .execute()
}
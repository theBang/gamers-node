const { DataSource } = require("typeorm");

module.exports = new DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    entities: [require("./entity/Player")],
    logging: true,
    synchronize: true
});
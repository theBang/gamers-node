const dataSource = require("./data-source");
const User = require("./entity/Player");
const seed = require("./seed");

function init() {
    dataSource
        .initialize()
        .then(() => {
            seed(dataSource);
        })
        .then(() => {
            console.log("Data Source has been initialized!");
        })
        .catch((err) => {
            console.error("Error during Data Source initialization:", err)
        })
}

function findPlayers(options) {
    return dataSource.getRepository(User).find(options);
}

module.exports = {
    init,
    findPlayers
}

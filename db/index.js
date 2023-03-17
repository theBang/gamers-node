const dataSource = require("./data-source");
const User = require("./entity/Player");
const seed = require("./seed");

function getDataSource() {
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

    return dataSource;
}

module.exports = {
    getDataSource,
    entities: {
        User
    }
}

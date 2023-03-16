require("dotenv").config();
const path = require("path");;
const db = require("./db");
const startDb = require("./db/start");
const express = require("express");

function asyncCall(callback) {
    return function (req, res, next) {
        callback(req, res, next).catch(next)
    }
}

(async function () {
    await startDb();

    const app = express();
    app.use("/static", express.static((path.join(__dirname, "public"))));
    app.get("/api/players", asyncCall(async function (req, res) {
        const { rows } = await db.getPlayers();
        res.json(rows);
    }));

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "views", "players.html"));
    });

    app.use((err, req, res, next) => {
        console.error(err.stack)
        res.status(500).send('Something broke!')
    })

    app.listen(3000, err => console.log(err ? "Error listening" : "Listening"))
})();

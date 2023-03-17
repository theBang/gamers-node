require("dotenv").config();
const path = require("path");;
const db = require("./db");
const express = require("express");

const app = express();
db.init();

function asyncCall(callback) {
    return function (req, res, next) {
        callback(req, res, next).catch(next)
    }
}

app.use("/static", express.static((path.join(__dirname, "public"))));

app.get("/api/players", asyncCall(async function (req, res) {
    const players = await db.findPlayers({
        select: {
            nickname: true,
            email: true,
            registered: true,
            status: true
        },
        where: {
            status: true
        },
        order: {
            registered: "ASC"
        }
    });

    res.json(players);
}));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views", "players.html"));
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(3000, err => console.log(err ? "Error listening" : "Listening"))
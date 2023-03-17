require("dotenv").config();
const path = require("path");;
const db = require("./db");
const express = require("express");
const open = require('open');

const app = express();
db.init();

function asyncCall(callback) {
    return function (req, res, next) {
        callback(req, res, next).catch(next)
    }
}

app.use("/static", express.static((path.join(__dirname, "public"))));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views", "players.html"));
});

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

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

const port = process.env.PORT || 3000;
app.listen(port, err => {
    console.log(err ? "Error listening" : "Listening");
    open(`http://localhost:${port}/`);
})
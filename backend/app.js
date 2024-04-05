const express = require("express");
const app = express();
const matchesRoute = require("./routes/matches");
const bodyParser = require("body-parser");
const pointTableRoute = require("./routes/pointTable");
const resultRoute = require("./routes/result");
const competitionRoute = require("./routes/competition");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/matches", matchesRoute);
app.use("/pointtable", pointTableRoute);
app.use("/result", resultRoute);
app.use("/competition", competitionRoute);

app.use((req, res) => {
    res.status(404).json({
        error: "Bad Request"
    })
})

module.exports = app;
const express = require('express');
// Use the latest stable(>12) version of nodejs
const mongoose = require('mongoose');
const cors = require("cors");
const ProblemSet = require('./models/problemSet')
const app = express();

app.use(express.json());

mongoose.connect(process.env.GOCODE_URI, (err) => {
    console.log("Connected to the database");
})

const corsOptions ={
   origin: '*',
   credentials: true,
   optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.get("/api/problems", (req, res) => {
    ProblemSet.find({}, (err, problems) => {
        if(err) {
            res.json({
                status: "failure"
            })
        } else {
            res.send(problems)
        }
    })
})


app.listen(5000, () => {
    console.log("Server started...");
})
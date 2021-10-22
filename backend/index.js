import express, { json, urlencoded } from 'express';
// Use the latest stable(>12) version of nodejs
import mongoose from 'mongoose';
import cors from "cors";
import  gocodeproblems  from './models/Gocodeproblems.js';
const app = express();
import userRouter from './routes/user.js';
import compileRouter from './routes/compile.js';
import profileRouter from "./routes/profile.js";
import Contests from './models/contest.js';
import contestRouter from './routes/contest.js'
import Profiles from './models/profile.js';
//import d from 'dotenv';
//d.config();

// dummy added to Profiles collection
//Profiles.create({userId: new ObjectId("615d3a535cbb99c73e8972b7"), rating: 2000});

app.use(json());
app.use(urlencoded({extended: true}));

mongoose.connect(process.env.GOCODE_URI, (err) => {
    console.log("Connected to the database");
})

const corsOptions ={
   origin: 'http://localhost:3000' || '*',
   credentials: true,
   optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use("/user", userRouter)
app.use("/compile", compileRouter)
app.use("/",contestRouter)
app.use("/profile", profileRouter);

app.get("/api/problems", (req, res) => {
    gocodeproblems.find({}, (err, problems) => {
        if(err) {
            res.json({
                status: "failure"
            })
        } else {
            res.send(problems)
        }
    })
})


// MathJax Library used in the frontend doesn't need $$$ to know that the equation is in tex. (react-mathjax package)
// Also the text needs to be enclosed in \text{} otherwise MathJax removes all the whitespaces 
const convertStatement = (str) => {
    let strarr = str.split('$$$')

    let ans = '';
    for(let i = 0; i < strarr.length; i++) {
        if(i%2 == 0) {
            ans += ' \\text{' + strarr[i] + '} '
        } else {
            ans += strarr[i]
        }
    }
    console.log(ans);
    return ans;
}


app.post('/compile/submit', (req, res) => {
    console.log(req.body)
})

app.get("/api/problem", (req, res) => {
    const problemID = req.query.problemID;
    gocodeproblems.findById(problemID, (err, problem) => {
        if(err) {
            res.json({
                status: "failure"
            })
        } else {
            // const obj = problem.toObject(); // used for react-mathjax package
            // let str = obj.statement;
            // // console.log(str)
            // const response = {...obj, statement: convertStatement(str) };
            // res.send(response);
            res.send(problem);
        }
    })
})


app.listen(5000, () => {
    console.log("Server started...");
})
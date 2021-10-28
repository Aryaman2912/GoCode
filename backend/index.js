import express, { json, urlencoded } from 'express';
// Use the latest stable(>12) version of nodejs
import mongoose from 'mongoose';
import cors from "cors";
const app = express();
import userRouter from './routes/user.js';
import compileRouter from './routes/compile.js';
import profileRouter from "./routes/profile.js";
import contestRouter from './routes/contest.js'
import submissionsRouter from './routes/submissions'
import Playlists from './routes/playlist';
import problemRouter from './routes/problems';
import pbsRouter from './routes/pbs.js';
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
app.use("/playlists", Playlists)
app.use("/",contestRouter)
app.use("/profile", profileRouter)
app.use("/api/compile", compileRouter)
app.use("/api/submissions", submissionsRouter)
app.use("/api/problems", problemRouter)
app.use("/api/pbs", pbsRouter)


app.listen(5000, () => {
    console.log("Server started...");
})
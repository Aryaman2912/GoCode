import Contests from "../models/contest";
import GoCodeProblems from "../models/Gocodeproblems";
import User from "../models/user";
import ContestProblems from "../models/contestProblems";

export const getPublicContests = async(req,res ) => {
    try{
        Contests.find({}, (err, contests) => {
            if(err) {
                res.json({
                    status: "failure"
                })
            } else {
                res.send(contests)
            }
        })
    } catch(error){
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getContest = async (req, res) => {
    // console.log(req);
    const  { id } = req.params;
    console.log(id);
    try{
        const contest = await Contests.findById(id);
        res.status(200).json(contest);
    } catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const addContest = async (req, res) => {
    try{
        console.log(req.body);
        const {contestName, date, duration, hostId} = req.body
        const user = await User.findById(hostId);
        let hostName = '';
        let id = undefined
        const data = {
            name: contestName,
            Host: hostName,
            Date: date,
            Duration: duration,
            isPublic: true,
            hostId: id,
        }
        data['Date'] = new Date(date);
        id = user._id;
        data['hostId'] = id;
        data['Host'] = user.name;
        console.log(data);
        const result = await Contests.create(data);
        res.status(200).json({result});
    } catch(err){
        console.log(err);
        res.status(500).json({err});
    }
}

export const deleteContest = async (req, res) => {
    try{
        // console.log(req);
        console.log(req.params);
        const contestId = req.params.id;
        console.log(contestId);

        await ContestProblems.deleteMany({contestId: contestId});
        await Contests.findByIdAndDelete(contestId);

        res.status(200).json({message: "Contest deleted successully."})
    } catch(err) {
        console.log(err);
        res.status(404).json({message: "Contest Not Found"});
    }
}

export const addProblem = async (req,res) => {
    try{
        const {contestId, hidden, name, statement, tags, input, output, testInput, testOutput} = req.body;
        console.log(req.body);
        const data = {
            name: req.body.problemName,
            description: 'description',
            statement: req.body.problemStatement,
            tags: req.body.tags,
            input: req.body.sampleInput,
            output: req.body.sampleOutput,
            testInput: req.body.testInputs,
            testOutput: req.body.testOutputs,
            hidden: req.body.hidden
        }
        console.log(data);
        const result = await GoCodeProblems.create(data);
        const result2 = await ContestProblems.create({contestId:req.body.contestId,problemId: result._id})
        console.log(result);
        // const result = await 
        res.status(200).json({result2});
    } catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
};

export const isValidContest = async (req, res) => {
    try {
        const contestId = req.params.id;
        const contest = await Contests.findById(contestId);
        let current_time = new Date().toISOString();
        console.log(current_time + "\n" + contest.Date.toISOString());
        console.log((current_time > contest.Date.toISOString()));
        // console.log(contest.Date instanceof Date);
        var closing_time = new Date(contest.Date);
        // console.log(closing_time.getHours());
        closing_time.setHours(closing_time.getHours() + parseFloat(contest.Duration));
        console.log(closing_time.toISOString());
        console.log(contest.Date);
        if(current_time >= contest.Date.toISOString() && current_time <= closing_time.toISOString()) {
            console.log("Valid contest");
            res.status(200).json({message: "Valid"});
        } else {
            res.status(200).json({message: "Invalid"});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({message: err});
    }
};
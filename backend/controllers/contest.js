import Contests from "../models/contest.js";
import GoCodeProblems from "../models/Gocodeproblems.js";
import User from "../models/user.js";
import ContestProblems from "../models/contestProblems.js";

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
        const {contestName, date, duration, description, hostId} = req.body
        const user = await User.findById(hostId);
        let hostName = '';
        let id = undefined
        const data = {
            name: contestName,
            Description: req.body.Description,
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
        data['leaderboad'] = [];
        data['problems'] = [];
        console.log(data);
        const result = await Contests.create(data);
        res.status(200).json({result});
    } catch(err){
        console.log(err);
        res.status(500).json({err});
    }
}
export const addProblem = async (req,res) => {
    try{
        const data = {
            name: req.body.problemName,
            description: 'description',
            statement: req.body.problemStatement,
            tags: req.body.tags,
            input: req.body.sampleInput,
            output: req.body.sampleOutput,
            testInput: req.body.testInputs,
            testOutput: req.body.testOutputs,
            hidden: req.body.hidden,
            score: req.body.score,
        }
        const result = await GoCodeProblems.create(data);

        Contests.findById(req.body.contestId,(err,contest) => {
            if(err){
                res.json({
                    status: "failure"
                })
            } else {
                contest.problems.addToSet(result._id)
                contest.save();
            }
        })
        res.status(200).json({result});
    } catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
};
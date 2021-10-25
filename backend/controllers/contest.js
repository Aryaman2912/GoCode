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
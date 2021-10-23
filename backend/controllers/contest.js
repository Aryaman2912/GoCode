import Contests from "../models/contest";
import GoCodeProblems from "../models/Gocodeproblems";
import User from "../models/user";
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
        const {name, description, statement, tags, input, output, testInput, testOutput} = req.body;
        // console.log(req.body);
        const data = {
            name: name,
            description: description,
            statement: statement,
            tags: tags,
            input: input,
            output:output,
            testInput: testInput,
            testOutput: testOutput,
            hidden: 'true',
        }
        // console.log(data);
        const result = await GoCodeProblems.create(data);

        res.status(200).json({result});
    } catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
};
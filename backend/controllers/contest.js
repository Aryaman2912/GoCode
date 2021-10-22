import Contests from "../models/contest";
import GoCodeProblems from "../models/Gocodeproblems";
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
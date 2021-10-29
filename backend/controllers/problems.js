import  gocodeproblems  from '../models/Gocodeproblems.js';


const getProblemRouter = (req, res) => {
    const problemID = req.query.problemID;
    if(!problemID) {
        gocodeproblems.find({}, (err, problems) => {
            if(err) {
                res.json({
                    status: "failure"
                })
            } else {
                res.json(problems)
            }
        })
    } else {
        gocodeproblems.findById(problemID, (err, problem) => {
            if(err) {
                res.json({
                    status: "failure"
                })
            } else {
                res.json(problem);
            }
        })
    }
}

export default getProblemRouter
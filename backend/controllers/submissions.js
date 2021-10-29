import Profile from "../models/profile.js";


const helper = async(req) => {
    try {
        const profile = await Profile.findOne({userId: req.userId})
        let x = profile.problems
        return x
    }
    catch {
        return []
    }
}

const filterSubmissions = async(submissions, id) => {
    submissions = await submissions.filter((submission) => {
        return submission.problemID.toString() === id.toString()
    })
    return submissions
}

export const getProblemSubmissions = async (req, res) => {
    const id = req.query.problemID
    if(!id) {
        res.status(400).json({message: "No problem ID provided"})
        return
    }
    let submissions = await helper(req)
    submissions = await filterSubmissions(submissions, id)
    res.send(submissions)
}

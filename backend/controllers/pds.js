import gocodeproblems from '../models/Gocodeproblems.js'
import Profile from '../models/profile.js'


export const pdsController = async (req, res) => {
    const userId = req.userId
    let tags = {}

    const profile = await Profile.findOne({ userId: req.userId })
        .populate('problems.problemID')

    let problemsSolved = {}

    const problems = profile.problems
    let problemsLength = profile.problems.length

    // For loop is synchronous
    for (let i = 0; i < problemsLength; i++) {
        let id = problems[i].problemID._id
        if (problems[i].verdict === 'accepted' && !problemsSolved[id]) {
            for (let j = 0; j < problems[i].problemID.tags.length; j++) {
                if (!tags[problems[i].problemID.tags[j]]) tags[problems[i].problemID.tags[j]] = 1
                else tags[problems[i].problemID.tags[j]]++
            }
            problemsSolved[id] = true
        }
    }
    res.json(tags)
}
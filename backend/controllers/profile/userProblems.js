import Profile from '../../models/profile.js'
import User from '../../models/profile.js'
import auth from '../../middleware/auth.js'

// 'display' GET request
// export const displayProblems = function(req, res){
//     try{
//         Profile.findOne({userId: req.userId}, function(error, profile){
//             if(error){
//                 res.json({status: "failure"});
//             }

//             else{
//                 //console.log(profile);

//                 res.send(profile.problems);
//             }
//         });
//     }

//     catch(error){
//         res.status(500).json({message: error});
//     }
// };

export const displayProblems = async(req, res) => {
    try{
        const profile = await Profile.findOne({ userId: req.userId })
        .populate('problems.problemID')

        if(!profile){
            res.status(404).json({ message: 'No profile found' })
        }
        const problems = profile.problems
        let result = []
        problems.forEach(problem => {
            result.push([problem.problemID.id, problem.problemID.name])
        })
        function multiDimensionalUnique(arr) {
            let uniques = [];
            let itemsFound = {};
            for(let i = 0, l = arr.length; i < l; i++) {
                let stringified = JSON.stringify(arr[i]);
                if(itemsFound[stringified]) { continue; }
                uniques.push(arr[i]);
                itemsFound[stringified] = true;
            }
            return uniques;
        }


        result = multiDimensionalUnique(result)
        res.status(200).json(result)
    }
    catch(error){
        res.status(500).json({ message: error })
    }
}


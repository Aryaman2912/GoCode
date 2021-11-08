import Profile from '../../models/profile.js'


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

        
        const multiDimensionalUnique = (arr)=> {
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


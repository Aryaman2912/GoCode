import Profiles from '../../models/profile.js'
import User from '../../models/profile.js'
import auth from '../../middleware/auth.js'

// 'display' GET request
export const displayProblems = function(req, res){
    try{
        Profiles.findOne({userId: req.userId}, function(error, profile){
            if(error){
                res.json({status: "failure"});
            }

            else{
                //console.log(profile);
                res.send(profile.problems);
            }
        });
    }

    catch(error){
        res.status(500).json({message: error});
    }
};


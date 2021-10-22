import Profiles from '../models/profile.js'
import {currentUserId} from "../controllers/user.js"
import auth from '../middleware/auth.js'

// 'display' GET request
export const display = function(req, res){
    try{
        Profiles.findOne({userId: req.userId}, function(error, profile){
            if(error){
                res.json({status: "failure"});
            }

            else{
                //console.log(currentUserId);
                //console.log(profile);
                res.send(profile);
            }
        });
    }

    catch(error){
        res.status(500).json({message: error});
    }
};
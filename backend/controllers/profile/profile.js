import Profiles from '../../models/profile.js'
import Users from '../../models/user.js'
import auth from '../../middleware/auth.js'

// 'display' GET request
export const display = function(req, res){
    try{
        Profiles.findOne({userId: req.userId}, function(error, profile){
            if(error){
                res.json({status: "failure"});
            }

            else{
                //console.log(profile);
                Users.findById(req.userId, function(error, user){
                    if(error){
                        res.json({status: "failure"});
                    }

                    else{
                        res.status(200).json({user});
                    }
                });
            }
        });
    }

    catch(error){
        res.status(500).json({message: error});
    }
};
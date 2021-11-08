import Profiles from '../../models/profile.js'
import Users from '../../models/user.js'
import auth from '../../middleware/auth.js'

// 'display' GET request
export const display = function(req, res){
    try{
        Users.findById(req.userId, function(error, user){
            if(error){
                res.json({status: "failure"});
            }

            else{
                res.status(200).json({user});
            }
        });
    }

    catch(error){
        res.status(500).json({message: error});
    }
};

// "update" POST request
export const updateProfile = function(req, res){
    try{
        Users.updateOne({_id : req.userId }, {name: req.body.name}, function (err, result) {
               if (err) throw err;
               else console.log("Updated user info");
        });
    }

    catch(error){
        res.status(500).json({message: error});
    }
};
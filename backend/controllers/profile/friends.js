import Profiles from '../../models/profile.js'
import User from '../../models/user.js'
import auth from '../../middleware/auth.js'

// 'display' GET request
export const displayFriends = function(req, res){
    try{
        console.log("Entered friends route");
        Profiles.findOne({userId: req.userId}, function(error, profile){
            if(error){
                res.json({status: "failure"});
            }

            else{
                //console.log(profile);
                res.send(profile.friends);
            }
        });
    }

    catch(error){
        res.status(500).json({message: error});
    }
};

// "search" POST request
export const searchUser = function(req, res){
    try {
        console.log("Entered search user route");
        User.find({name: req.body.name}, function(error, users){
            if(users === null) res.send("No such user found");
            else res.send(users);
        });;
    } 
    
    catch(error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// 'add' POST request
export const addFriend = function(req, res){
    try {
        User.findOne({email: req.body.email}, function(error, existingUser){
            if(error){
                throw error;
            }

            else{
                Profiles.findOne({userId: req.userId}, function(error, currentUser){
                    if(error) throw error;
                    else{
                        if(!(existingUser === null)){
                            currentUser.friends.addToSet(existingUser._id);
                            currentUser.save();
                            res.send('Friend Added');
                        }
                        else res.send(null);
                    }
                });
            }
        });
    } 
    
    catch(error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
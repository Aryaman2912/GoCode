import Profiles from '../models/profile.js'
import {currentUserId} from "../controllers/user.js"
import User from '../models/profile.js'
import auth from '../middleware/auth.js'

// 'display' GET request
export const displayFriends = function(req, res){
    try{
        Profiles.findOne({userId: req.userId}, function(error, profile){
            if(error){
                res.json({status: "failure"});
            }

            else{
                //console.log(currentUserId);
                console.log(profile);
                res.send(profile.friends);
            }
        });
    }

    catch(error){
        res.status(500).json({message: error});
    }
};

// 'display' GET request
export const addFriend = async function(req, res){
    const { email } = req.body;

    try {

        //console.log(email);

        const existingUser = await User.findOne({ email });

        //console.log(existingUser);

        if(!existingUser) return res.send(null);//status(400).json({ message: "User does not exist" });

        else{

            var currentUser = await Profiles.findOne({userId: req.userId}); 

            currentUser.friends.addToSet(existingUser._id);
            currentUser.save();

            //console.log("Friend added");
            //console.log(existingUser);

            res.send("Friend added");

        }
    } catch(error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
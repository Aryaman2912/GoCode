import Playlists from '../../models/playlist.js';
import auth from '../../middleware/auth.js'

// display the current playlist "get" request
export const showPlaylist = function(req, res){
    try{
        Playlists.findById(req.params.id, function(error, playlist){
            if(error){
                res.json({status: "failure"});
            }

            else{
                res.send(playlist);
            }
        });
    }

    catch(error){
        res.status(500).json({message: error});
    }
};

// add a problem to the current playlist "post" request
export const addProblem = function(req, res){
    try{
        const {problem} = req.body;

        Playlists.findById(req.params.id, function(error, playlist){
            if(error){
                res.json({status: "failure"});
            }

            else{
                playlist.problems.addToSet(problem);
                playlist.save();
                console.log("Problem added!");
                //res.send("Problem added!");
            }
        });
    }

    catch(error){
        res.status(500).json({message: error});
    }
};

// change description 
export const changeDesc = function(req, res){
    try{

        Playlists.findById(req.params.id, function(error, playlist){
            if(error){
                res.json({status: "failure"});
            }

            else{
                Playlists.updateOne({ _id: req.params }, { description: req.body.description });
                console.log("Description updated!");
                //res.send("Problem added!");
            }
        });
    }

    catch(error){
        res.status(500).json({message: error});
    }
};
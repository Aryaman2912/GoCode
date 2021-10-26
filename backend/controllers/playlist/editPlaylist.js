import Playlists from '../../models/playlist.js';
import auth from '../../middleware/auth.js'

// display the current playlist "get" request
export const showPlaylist = function(req, res){
    try{
        const {playlistId} = req.params;
        Playlists.findById(playlistId, function(error, playlist){
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
        const {playlistId} = req.params;
        const {problem} = req.body;

        Playlists.findById(playlistId, function(error, playlist){
            if(error){
                res.json({status: "failure"});
            }

            else{
                playlist.problems.addToSet(problem);
                playlist.save();
                res.send("Problem added!");
            }
        });
    }

    catch(error){
        res.status(500).json({message: error});
    }
};
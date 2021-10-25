import Playlists from '../../models/playlist.js';
import auth from '../../middleware/auth.js'

// display playlists 'get' request
export const display = function(req, res){
    try{
        Playlists.find({userId: req.userId}, function(error, all){
            if(error){
                res.json({status: "failure"});
            }

            else{
                res.send(all);
            }
        });
    }

    catch(error){
        res.status(500).json({message: error});
    }
};

// create playlist 'post' request
export const create = function(req, res){
    try{
        await Playlists.create({userId: req.userId, name: req.body});
        res.send("Playlist created successfully!");
    }

    catch(error){
        res.status(500).json({message: error});
    }
}
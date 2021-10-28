import Playlists from '../../models/playlist.js';
import auth from '../../middleware/auth.js'

// display the current playlist "get" request
export const show = function(req, res){
    try{
        Playlists.findById(req.params.id, function(error, playlist){
            if(error){
                res.json({status: "failure"});
            }

            else{
                //console.log(playlist);
                res.send(playlist);
            }
        });
    }

    catch(error){
        res.status(500).json({message: error});
    }
};

/*
// "like" the current playlist "post" request
export const likePlaylist = function(req, res){
    try{
        const {playlistId} = req.params;
        Playlists.findById(playlistId, function(error, playlist){
            if(error){
                res.json({status: "failure"});
            }

            else{
                playlist
            }
        });
    }

    catch(error){
        res.status(500).json({message: error});
    }
}*/

// comment on the playlist, post request
export const comment = function(req, res){
    try{
        Playlists.findById(req.params.id, function(error, playlist){
            if(error){
                res.json({status: "failure"});
            }

            else{
                playlist.comments.push(req.body.comment);
                playlist.save();
            }
        });
    }

    catch(error){
        res.status(500).json({message: error});
    }
};
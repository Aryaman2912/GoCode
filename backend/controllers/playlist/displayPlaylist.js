import Playlists from '../../models/playlist.js';
import auth from '../../middleware/auth.js'

// display playlist 'get' request
export const displayPlaylists = function(req, res){
    try{
        Playlists.find({}, function(error, all){
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
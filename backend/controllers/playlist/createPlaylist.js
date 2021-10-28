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
export const create = async function(req, res){
    try{
        let playlist = await Playlists.create({userId: req.userId, name: req.body.name, description: req.body.description, likes: 0});
        res.status(200).json(playlist)
        console.log("Playlist created successfully!");
    }

    catch(error){
        console.log(error);
        res.status(500).json({"message": error});
    }
}
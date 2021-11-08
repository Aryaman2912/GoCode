import Playlists from '../../models/playlist.js';
import auth from '../../middleware/auth.js'
import Users from '../../models/user.js'

// display playlist 'get' request
export const displayPlaylists = async function (req, res) {
    try {
        // const playlist = await Playlists.findOne({ userId: req.userId }).populate('userId');
        // console.log(playlist)

        // Playlists.find({}, function (error, all) {
        //     if (error) {
        //         res.json({ status: "failure" });
        //     }

        //     else {

        //         Users.find
        //         res.send(all);
        //     }
        // });

        // res.status(200).json(playlist);

        const playlists = await Playlists.find({}).populate('userId')

        console.log(playlists)
        res.status(200).json(playlists)

    }

    catch (error) {
        res.status(500).json({ message: error });
    }
};
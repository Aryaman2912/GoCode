import cloudinary from 'cloudinary'
import streamifier from 'streamifier'
import User from '../../models/user.js'


cloudinary.config({ 
    cloud_name: 'doqxwd5vy', 
    api_key: '172736955169323', 
    api_secret: '_fUJkhyZUm8l9ymVvWASjhGBav8',
    secure: true
});

let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            (result) => {
                if('error' in result){
                    reject(result.error)
                } else {
                    resolve(result)
                }
            }
          );
        streamifier.createReadStream(req.file.buffer).pipe(stream)
    })
}


const upload = async(req) => {
    try{
        let result = await streamUpload(req);
        return {
            message: 'success',
            url: result.secure_url
        }
    }
    catch(err){
        console.log(err)
        return {
            message: 'error',
        }
    }
}


export const uploadPhoto = async(req, res) => {
    try{
        let uploadResult = await upload(req);
        // console.log(uploadResult)
        if(uploadResult.message === 'success') {
            try {
                await User.findOneAndUpdate({_id: req.userId}, {$set: {avatar: uploadResult.url}})
            }
            catch(e) {
                res.status(500).json({
                    message: 'error'
                })
            }
            res.status(200).json({uploadResult})
        } else {
            res.status(500).json({uploadResult})
        }
    }
    catch(err){
        const uploadResult = {
            message: 'error'
        }
        res.status(500).json({uploadResult})
    }
}
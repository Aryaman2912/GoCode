import jwt from 'jsonwebtoken';
// Middleware to ensure that when a POST request is made, the user making
// The POST/PUT request is authenticated
//
// Flow is as follows:
// User makes a POST/PUT/DELETE request => Middleware is invoked to authenticate user => next() is invoked to continue the request.
const auth = async (req, res, next) => {
    try {
        // console.log(req.headers)
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(isCustomAuth && token) {
            // For custom authentication tokens. 
            decodedData = jwt.verify(token, 'randomaccesstoken');

            req.userId = decodedData?.id;
        } else {
            // For tokens obtained using oauth. 
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch(err) {
        // console.log('F');
        console.log(err);
    }
}

export default auth;
//grig
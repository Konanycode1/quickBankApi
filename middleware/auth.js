const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try {
        const token =  req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_KEY');
        const userId = decodeToken.userId
        req.auth = {
            userId: userId
        }
        next();
        
    } catch (error) {
        return res.redirect('/page/login.html');
        
    }
}
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/configConstants');

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth'];
    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET); //validate token (returns decoded token if valid)
            
            req.user = decodedToken; //attach user data to req object (can be used in later requests from now on)
            
            next();

        } catch (err) {
            res.clearCookie('auth');
            
            res.redirect('/users/login');
        }
    } else {
        next();
    }
};

const bcrypt = require('bcrypt');

const jwt = require('../lib/jwt');
const { SECRET } = require('../config/configConstants');
const User = require('../models/User');

exports.register = (userData) => User.create(userData);

exports.login = async (username, password) => {   
    const user = await User.findOne({ username });  //find user
    if (!user) {
        throw new Error('Cannot find username or password.');
    }
 
    const isValid = await bcrypt.compare(password, user.password);  //validate password for this user
    if (!isValid) {
        throw new Error('Cannot find username or password.');
    }

    const payload = {
        _id: user._id,
        username: user.username
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });

    return token;
};

// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
// 60dc44ea38f1a5c22ec8a1bd3fddf9fe9e6c5312fb210a92b7e94325c0a42ea9

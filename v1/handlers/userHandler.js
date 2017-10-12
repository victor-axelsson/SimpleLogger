var userHandler = {};

var sha1 = require('sha1');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var env = require('../../env')

/** 
 * Verify password
 * @author Victor Axelsson
 */
userHandler.verifyPassword = function(password1, password2, salt) {
    return password1 == sha1(password2 + salt) ? true : false;
};

/** 
 * Create token
 * @author Victor Axelsson
 */
userHandler.createToken = function(user) {
    return jwt.sign(user, env.token, {
        expiresInMinutes: env.tokenValid
    });
}

/** 
 * Valid token
 * @author Victor Axelsson
 */
userHandler.validToken = function(token, callback) {

    // Check that key is okey
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, env.token, function(err, result) {
            callback(null, (result ? true : false));
        });

    } else {
        callback(null, false);
    }
};

userHandler.login = function(req, res) {
    throw "Not implemented"; 
}

module.exports = userHandler;

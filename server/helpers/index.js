const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');

function encrypt(password){
    return bcrypt.hashSync(password, salt)
}

function compare(password, passHash){
    return bcrypt.compareSync(password, passHash); 
}
function sign(params){
    return  jwt.sign(params, process.env.JWT_SECRET)
}
function verifyJWT(token){
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {encrypt, compare, verifyJWT, sign}
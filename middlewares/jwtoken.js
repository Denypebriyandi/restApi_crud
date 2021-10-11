require ('dotenv').config();
const jwt = require('jsonwebtoken');

exports.generateToken = async (request, response) => {
    const dataJwt = {
        create_data: new Date()
    }
    const createJwt = await jwt.sign(dataJwt, process.env.KEY_JWT, { expiresIn: process.env.EXP_JWT }, { algorithm: 'RS256' });
    const data = {
        'status': 200,
        'message': 'Generate token berhasil',
        'token': createJwt
    }
    response.status(200);
    response.end(response.json(data));
}

exports.decode = (bearerToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(bearerToken, process.env.KEY_JWT, function(err, decoded) {     
            if(err) {
                console.log('error decodeJwt.decode: '+err.message)
                reject(err.message);
            } else {
                resolve(decoded);
            }
        });
    })
}
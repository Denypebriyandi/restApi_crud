require ('dotenv').config();
const decodeJwt = require('./jwtoken');
// const checkToken = require('./checkToken');

exports.basicAuth = (request, response, next) => {
    const authorization = request.headers.authorization;
    const apiKey = request.headers['x-api-key'];
    // console.log(apiKey)
    if(authorization === undefined) {
        let data = {
            'status': 401,
            'message': 'No Auth'
        }
        response.status(401);
        response.end(response.json(data));
    } else {
        let username = process.env.BASIC_USERNAME;
        let password = process.env.BASIC_PASSWORD;
        let basicAuth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
        if(authorization === basicAuth) {
            if(apiKey !== process.env.X_API_KEY) {
                let data = {
                    'status': 403,
                    'message': 'Your key is invalid'
                }
                response.status(403);
                response.end(response.json(data));
            } else {
                next();
            }
        } else {
            let data = {
                'status': 401,
                'message': 'Authority is wrong'
            }
            response.status(401);
            response.end(response.json(data));
        }
    }
}

exports.verify = async (request, response, next) => {
    try {
        const authorization = request.headers['authorization']
        const From = request.headers['from']
        const apiKey = request.headers['x-api-key']
        if(typeof authorization !== 'undefined') {
            const bearer = authorization.split(' ');
            const typeAuth = bearer[0];
            const bearerToken = bearer[1];
            if (typeAuth === "Bearer") {
                const decode = await decodeJwt.decode(bearerToken);
                if (apiKey !== undefined) {
                    if (apiKey !== "") {
                        if (apiKey === process.env.X_API_KEY) {
                            request.session = decode;
                            next();
                        } else {
                            let data = {
                                'status': 403,
                                'message': 'Your key is invalid'
                            }
                            response.status(403);
                            response.end(response.json(data));
                        }
                    } else {
                        let data = {
                            'status': 403,
                            'message': 'your key is empty'
                        }
                        response.status(403);
                        response.end(response.json(data));
                    }
                } else {
                    let data = {
                        'status': 403,
                        'message': 'No Api key'
                    }
                    response.status(403);
                    response.end(response.json(data));
                }
            } else {
                let data = {
                    'status': 401,
                    'message': 'Not Bearer'
                }
                response.status(401);
                response.end(response.json(data));
            }
        } else {
            let data = {
                'status': 401,
                'message': 'No Auth'
            }
            response.status(401);
            response.end(response.json(data));
        }
    } catch (error) {
        if (error === "jwt expired") {
            let data = {
                'status': 401,
                'message': 'Your key bearer has expired, please log in again to correct the session'
            }
            response.status(401);
            response.end(response.json(data));
        } else if (error === "not_match") {
            let data = {
                'status': 401,
                'message': 'Your key bearer is invalid'
            }
            response.status(401);
            response.end(response.json(data));
        } else {
            console.log(error);
            let data = {
                'status': 500,
                'message': error
            }
            response.status(500);
            response.end(response.json(data));
        }
    }
}
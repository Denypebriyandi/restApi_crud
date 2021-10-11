const mySql = require('../configs/connect');

exports.insert = (data) => {
    return new Promise((resolve, reject) => {
        mySql.getConnection(function(err, connection) {
            if (err) {
                console.log('error connection q_crud.insert: '+err.message);
                reject(err.message);
            } else {
                const sql = `INSERT INTO user_data SET ?`;
                connection.query(sql,[data], function (error, results, fields) {
                    connection.release();
                    if (error) {
                        console.log('error query q_crud.insert: '+error.message);
                        reject(error.message);
                    } else {
                        resolve(data);
                    }
                });
            }
        });
    })
}

exports.read = () => {
    return new Promise((resolve, reject) => {
        mySql.getConnection(function(err, connection) {
            if (err) {
                console.log('error connection q_crud.read: '+err.message);
                reject(err.message);
            } else {
                const sql = `select id, userName, accountNumber, emailAddress, identityNumber, create_date, update_date
from user_data
where is_active = 1
order by create_date desc`;
                connection.query(sql, function (error, results, fields) {
                    connection.release();
                    if (error) {
                        console.log('error query q_crud.read: '+error.message);
                        reject(error.message);
                    } else {
                        resolve(results);
                    }
                });
            }
        });
    })
}

exports.readAccountNumber = (params) => {
    return new Promise((resolve, reject) => {
        mySql.getConnection(function(err, connection) {
            if (err) {
                console.log('error connection q_crud.readAccountNumber: '+err.message);
                reject(err.message);
            } else {
                const sql = `select id, userName, accountNumber, emailAddress, identityNumber, create_date, update_date
from user_data
where accountNumber = ?
and is_active = 1
order by create_date desc`;
                connection.query(sql,[params], function (error, results, fields) {
                    connection.release();
                    if (error) {
                        console.log('error query q_crud.readAccountNumber: '+error.message);
                        reject(error.message);
                    } else {
                        resolve(results);
                    }
                });
            }
        });
    })
}

exports.readidentityNumber = (params) => {
    return new Promise((resolve, reject) => {
        mySql.getConnection(function(err, connection) {
            if (err) {
                console.log('error connection q_crud.readidentityNumber: '+err.message);
                reject(err.message);
            } else {
                const sql = `select id, userName, accountNumber, emailAddress, identityNumber, create_date, update_date
from user_data
where identityNumber = ?
and is_active = 1
order by create_date desc`;
                connection.query(sql,[params], function (error, results, fields) {
                    connection.release();
                    if (error) {
                        console.log('error query q_crud.readidentityNumber: '+error.message);
                        reject(error.message);
                    } else {
                        resolve(results);
                    }
                });
            }
        });
    })
}

exports.update = (params,body) => {
    return new Promise((resolve, reject) => {
        mySql.getConnection(function(err, connection) {
            if (err) {
                console.log('error connection q_crud.update: '+err.message);
                reject(err.message);
            } else {
                const sql = `update user_data set accountNumber = ?, emailAddress = ?, identityNumber = ? where id = ?`;
                connection.query(sql,[body.accountNumber,body.emailAddress,body.identityNumber,params], function (error, results, fields) {
                    connection.release();
                    if (error) {
                        console.log('error query q_crud.update: '+error.message);
                        reject(error.message);
                    } else {
                        if (results.affectedRows === 1) {
                            resolve(true);
                        } else {
                            reject('no_update');
                        }
                    }
                });
            }
        });
    })
}

exports.delete = (params) => {
    return new Promise((resolve, reject) => {
        mySql.getConnection(function(err, connection) {
            if (err) {
                console.log('error connection q_crud.delete: '+err.message);
                reject(err.message);
            } else {
                const sql = `update user_data set is_active = 0 where id = ?`;
                connection.query(sql,[params], function (error, results, fields) {
                    connection.release();
                    if (error) {
                        console.log('error query q_crud.delete: '+error.message);
                        reject(error.message);
                    } else {
                        if (results.affectedRows === 1) {
                            resolve(true);
                        } else {
                            reject('no_update');
                        }
                    }
                });
            }
        });
    })
}
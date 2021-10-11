const model = require('../querys/q_crud');

exports.create = async (request, response) => {
    try {
        const insert = await model.insert(request.body);
        let data = {
            'status': 201,
            'message': 'Menambah data baru berhasil',
            'data': insert
        }
        response.status(201);
        response.end(response.json(data));
    } catch (error) {
        console.log(error);
        let data = {
            'status': 500,
            'message': error
        }
        response.status(500);
        response.end(response.json(data));
    }
}

exports.get = async (request, response) => {
    try {
        const read = await model.read();
        let data = {
            'status': 200,
            'message': 'Mengambil data berhasil',
            'data': read
        }
        response.status(200);
        response.end(response.json(data));
    } catch (error) {
        console.log(error);
        let data = {
            'status': 500,
            'message': error
        }
        response.status(500);
        response.end(response.json(data));
    }
}

exports.getAccountNumber = async (request, response) => {
    try {
        params = request.params.accountNumber
        const read = await model.readAccountNumber(params);
        let data = {
            'status': 200,
            'message': 'Mengambil data berhasil',
            'data': read
        }
        response.status(200);
        response.end(response.json(data));
    } catch (error) {
        console.log(error);
        let data = {
            'status': 500,
            'message': error
        }
        response.status(500);
        response.end(response.json(data));
    }
}

exports.getidentityNumber = async (request, response) => {
    try {
        params = request.params.identityNumber
        const read = await model.readidentityNumber(params);
        let data = {
            'status': 200,
            'message': 'Mengambil data berhasil',
            'data': read
        }
        response.status(200);
        response.end(response.json(data));
    } catch (error) {
        console.log(error);
        let data = {
            'status': 500,
            'message': error
        }
        response.status(500);
        response.end(response.json(data));
    }
}

exports.update = async (request, response) => {
    try {
        params = request.params.id
        const update = await model.update(params,request.body);
        let data = {
            'status': 200,
            'message': 'Update data berhasil'
        }
        response.status(200);
        response.end(response.json(data));
    } catch (error) {
        if (error === "no_update") {
            let data = {
                'status': 400,
                'message': 'Tidak ada data yang di update'
            }
            response.status(400);
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

exports.delete = async (request, response) => {
    try {
        params = request.params.id
        const del = await model.delete(params);
        let data = {
            'status': 200,
            'message': 'Delete data berhasil'
        }
        response.status(200);
        response.end(response.json(data));
    } catch (error) {
        if (error === "no_update") {
            let data = {
                'status': 400,
                'message': 'Tidak ada data yang di delete'
            }
            response.status(400);
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
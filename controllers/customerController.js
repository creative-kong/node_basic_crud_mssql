const mssql = require('mssql')
const sqlConfig = require('../config/sqlConfig')

exports.getCustomers = async (req ,res, next) => {
    try {
        const pool = await mssql.connect(sqlConfig)
        const response = await pool.request().query('select * from customer')
        if(response.recordset.length === 0){
            return res.status(200).json({
                data : response.recordset,
                message : 'data is empty.',
                status : false
            })
        }
        res.status(200).json({
            data : response.recordset,
            message : 'successfully.',
            status : true
        })
    } catch (err) {
        res.status(500).json({
            data : [],
            message : err,
            status : false
        })
    }
}

exports.getCustomer = async (req, res, next) => {
    try {
        const pool = await mssql.connect(sqlConfig)
        const response = await pool.request().input('id', mssql.Int, req.params.id).query(`select * from customer where customer_id = @id`)
        if(response.recordset.length === 0) {
            return res.status(200).json({
                data : response.recordset,
                message : `data with id ${req.params.id} is empty.`,
                status : false
            })
        }
        res.status(200).json({
            data : response.recordset,
            message : 'successfully.',
            status : true
        })
    } catch (err) {
        res.status(500).json({
            data : [],
            message : err,
            status : false
        })
    }
}

exports.createCustomer = async (req, res, next) => {
    try {
        const pool = await mssql.connect(sqlConfig)
        const response = pool.request()
                            .input('customer_id', mssql.Int, 0)
                            .input('customer_firstname', mssql.NVarChar(50), req.body.firstname)
                            .input('customer_lastname', mssql.NVarChar(50), req.body.lastname)
                            .input('customer_sex', mssql.Int, req.body.sex)
                            .input('customer_tel', mssql.NVarChar(50), req.body.phone)
                            .input('customer_email', mssql.NVarChar(255), req.body.email)
                            .execute('manage_customer', (err, result) => {
                                if(err) {
                                    return res.status(200).json({
                                        data : [],
                                        message : err,
                                        status : false
                                    })
                                }
                                if(result.recordset[0][''] === 0) {
                                    return res.status(200).json({
                                        data : [],
                                        message : 'code has been used.',
                                        status : false
                                    })
                                }
                                if(result.recordset[0][''] === -2) {
                                    return res.status(200).json({
                                        data : [],
                                        message : 'error to create customer.',
                                        status : false
                                    })
                                }
                                res.status(200).json({
                                    data : result.recordset,
                                    message : 'successfully.',
                                    status : true
                                })
                            })
    } catch (err) {
        res.status(500).json({
            data : [],
            message : err,
            status : false
        })
    }
}

exports.updateCustomer = async (req, res, next) => {
    try {
        const pool = await mssql.connect(sqlConfig)
        const response = await pool.request()
                            .input('customer_id', mssql.Int, req.params.id)
                            .input('customer_firstname', mssql.NVarChar(50), req.body.firstname)
                            .input('customer_lastname', mssql.NVarChar(50), req.body.lastname)
                            .input('customer_sex', mssql.Int, req.body.sex)
                            .input('customer_tel', mssql.NVarChar(50), req.body.phone)
                            .input('customer_email', mssql.NVarChar(255), req.body.email)
                            .execute('manage_customer', (err, result) => {
                                if(err) {
                                    return res.status(200).json({
                                        data : [],
                                        message : err,
                                        status : false
                                    })
                                }

                                if(result.recordset[0][''] === -2) {
                                    return res.status(200).json({
                                        data : [],
                                        message : 'error to update customer.',
                                        status : false
                                    })
                                }

                                res.status(200).json({
                                    data : result.recordset,
                                    message : 'successfully.',
                                    status : true
                                })
                            })
    } catch (err) {
        res.status(500).json({
            data : [],
            message : err,
            status : false
        })
    }
}

exports.deleteCustomer = async (req, res, next) => {
    try {
        const pool = await mssql.connect(sqlConfig)
        const response = pool.request().input('id', mssql.Int, req.params.id).query(`delete from customer where customer_id = @id`, (err, result) => {
            if(err) {
                return res.status(200).json({
                    data : [],
                    message : err,
                    status : false
                })
            }
            res.status(200).json({
                data : [],
                message : 'successfully.',
                status : true
            })
        })
    } catch (err) {
        res.status(500).json({
            data : [],
            message : err,
            status : false
        })
    }
}
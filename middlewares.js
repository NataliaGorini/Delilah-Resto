const jwt = require('jsonwebtoken');
const sign = "proyectoDelilah";
const Sequelize = require('sequelize')
const db = new Sequelize ('mysql://root@localhost:3306/delilah')

db.authenticate()
    .then(() =>{
        console.log("conexion ok")
    })
    .catch (err =>{
        console.log('conexion fallida', err)
    })

function authenticateUser (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify (token, sign);
        if (verifyToken){
            req.usuario = verifyToken;
            return next();
        }
    } catch (err) {
        res.status(400).send('error al validar usuario')
    }
}
async function isAdmin (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify (token, sign);
        console.log(verifyToken)
        if (verifyToken.filterAdmin.isAdmin === 1) {
            return next();
        }
    } catch (err) {
        res.status(400).send('No posee derechos para realizar esta accion')
    } 
}
async function checkOrderStatus (req, res, next) {
    try{
        const {order_id} = req.params
        const orderStatus = await db.query(`SELECT status FROM pedidos_productos WHERE order_id = ${order_id}`, 
        {type: Sequelize.QueryTypes.SELECT})
        console.log(orderStatus)
        if (orderStatus[0].status === 'nuevo') {
            return next();
        } else {
            res.status(400).send('No puede eliminar una orden en proceso')
        }
    }catch (err) {
        res.status(400).send('No puede eliminar una orden en proceso')
    } 
}

module.exports = {
    authenticateUser,
    isAdmin,
    checkOrderStatus
} 
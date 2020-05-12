const jwt = require('jsonwebtoken');
const sign = "proyectoDelilah";

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

module.exports = {
    authenticateUser,
    isAdmin
} 
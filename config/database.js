const Sequelize = require('sequelize')
const db = new Sequelize ('mysql://root@localhost:3306/0Dr4WTsR8s')

db.authenticate()
    .then(() =>{
        console.log("conexion ok")
    })
    .catch (err =>{
        console.log('conexion fallida', err)
    })


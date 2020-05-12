const Sequelize = require('sequelize')
const db = new Sequelize ('mysql://root@localhost:3306/delilah')
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt')
const sign = "proyectoDelilah"

db.authenticate()
    .then(() =>{
        console.log("conexion ok")
    })
    .catch (err =>{
        console.log('conexion fallida', err)
    })


module.exports = {
    addNewUser: (req, res) => {
        db.query('INSERT INTO usuarios (nickname, fullname, password, email, phone, address) VALUES (:nickname, :fullname, :password, :email, :phone, :address)',
         {replacements: req.body})
            .then (result => {console.log(result) || res.status(201).json({result:'Usuario agregado correctamente. Bienvenido'})})
            .catch (err => {console.log(err) || res.status(400).send('revisa la info ingresada')})
    },
    login: async (req, res) => {
        const { nickname, password } = req.body;
        const userDB = await db.query(`SELECT nickname, password FROM usuarios WHERE nickname = "${nickname}" AND password = "${password}"`, {type: Sequelize.QueryTypes.SELECT})
        const adminDB = await db.query(`SELECT isAdmin FROM usuarios WHERE nickname = "${nickname}"`, {type: Sequelize.QueryTypes.SELECT})
        const filterUser = userDB.find(row => row.nickname === nickname && row.password === password)
        const filterAdmin = adminDB.find(row => row.isAdmin === 1)
        if (filterUser == undefined){
            res.status(400).send('usuario o contraseña incorrecta')
        } else if(filterAdmin == undefined){
            const user = req.body
            const token = jwt.sign({
            user
            }, sign);
        res.json({token})
        console.log(token)
        } else {
            const user = req.body
            const token = jwt.sign({
            user, filterAdmin
            }, sign);
        res.json({token})
        console.log(token)
        }
    },
    allUsers: (req,res) => {
        db.query(`SELECT * FROM usuarios`, {type: Sequelize.QueryTypes.SELECT})
            .then(result => console.log(result) || res.status(200).json(result).end())
            .catch(error => console.log('error ' + error) || res.status(400).json({error : 'no hay usuarios'}))
    },
    updateUserData: async (req,res) => {
        const {user_id} = req.params
        const newAddress = req.body.address
        const newPhone = req.body.phone
        db.query(`UPDATE usuarios SET address = '${newAddress}', phone = ${newPhone} WHERE user_id = ${user_id}`, {type: Sequelize.QueryTypes.UPDATE })
            .then(result => console.log(result) || res.status(200).json({result: 'Informacion actualizada'}))
            .catch(error => console.log('error ' + error) || res.status(400).json({error : 'no hay usuarios'}))
    }
}


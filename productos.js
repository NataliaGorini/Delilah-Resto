const Sequelize = require('sequelize')
const db = new Sequelize ('mysql://root@localhost:3306/delilah')

db.authenticate()
    .then(() =>{
        console.log("conexion ok")
    })
    .catch (err =>{
        console.log('conexion fallida', err)
    })

module.exports = {
    getProducts: (req, res) => {db.query('SELECT * FROM productos', { type: Sequelize.QueryTypes.SELECT})
        .then(result => res.status(200).json(result).send('Que vas a comer hoy?'))
        .catch (err => res.status(400).json({error:'algo salió mal'}))
    },
    addProducts: (req, res) => {
        db.query('INSERT INTO productos (dish, ingredients, price) VALUES (:dish, :ingredients, :price)',
         {replacements: req.body})
            .then (result => {console.log(result) || res.status(201).send('Producto agregado correctamente!')})
            .catch (err => {console.log(err) || res.status(400).send('algo salió mal')})
    },
    updateProduct: (req, res) => {
        const {product_id} = req.params
        const newPrice = req.body.price
        db.query(`UPDATE productos SET price = ${newPrice} WHERE product_id = ${product_id}`, {type: Sequelize.QueryTypes.UPDATE })
            .then (result => {console.log(result) || res.status(201).send('Producto actualizado correctamente!')})
            .catch (err => {console.log(err) || res.status(400).send('algo salió mal')})  
    }, 
    deleteProduct: (req, res) => {
        const {product_id} = req.params
        db.query(`DELETE FROM productos WHERE product_id = ${product_id}`, {type: Sequelize.QueryTypes.DELETE})
            .then (result => {console.log(result) || res.status(200).send('Producto eliminado!')})
            .catch (err => {console.log(err) || res.status(400).send('algo salió mal')})  
    }  
}

const Sequelize = require('sequelize')
const db = new Sequelize ('mysql://root@localhost:3306/delilah')

db.authenticate()
    .then(() =>{
        console.log("conexion ok")
    })
    .catch (err =>{
        console.log('conexion fallida', err)
    })
function getAmount (priceByProduct, quantity){
   const priceProductByQuant = priceByProduct * quantity
   return priceProductByQuant
}
module.exports = {
    allOrders: (req, res) => {
        db.query('SELECT * FROM pedidos_productos', { type: Sequelize.QueryTypes.SELECT})
            .then(rows => res.status(200).json(rows)).send('Estos son todos los pedidos')
            .catch (err => res.status(400).send('algo salió mal'))
        },
    seeOrderbyUser: async (req, res) => {
        const {order_id} = req.params
        db.query(`SELECT pedidos_productos.*, pedidos.order_id, productos.dish FROM pedidos_productos WHERE order_id = ${order_id}
        JOIN pedidos ON pedidos_productos.order_id = pedidos.order_id
        JOIN productos ON pedidos_productos.product_id = productos.product_id`,
        {type: Sequelize.QueryTypes.SELECT })
            .then (result => res.status(200).json(result))
            .catch (err => {console.log(err) || res.status(400).send('Usted no tiene ningun pedido')}) 
    },
    createOrder: async (req, res) => {
        const userID = req.body.user_id
        const payment = req.body.payment
        const productID = req.body.product_id
        const quantity = req.body.quantity
        const order = await db.query(`INSERT INTO pedidos (user_id, payment) VALUES (${userID}, "${payment}")`)

        const allOrdersID = await db.query(`SELECT order_id FROM pedidos WHERE user_id = ${userID}`, {type: Sequelize.QueryTypes.SELECT})
        const ordersID = allOrdersID[0].order_id
        
        const price = await db.query(`SELECT price FROM productos WHERE product_id= ${productID}`, {type: Sequelize.QueryTypes.SELECT})
        const priceByProduct = price[0].price
        const finalPrice = getAmount(priceByProduct,quantity)

        db.query(`INSERT INTO pedidos_productos (order_id, product_id, quantity, amount) VALUES (${ordersID}, ${productID}, ${quantity}, ${finalPrice})`, {replacements:req.body})
            .then(result => console.log(result) || res.status(200).json({result: "Orden generada"}))
            .catch(error => console.log('error ' + error) || res.status(400).json({error : 'fallo'}))
    },
    allOrdersAdmin: async (req,res) => {
        const ordersAndUser = await db.query(`SELECT pedidos_productos.*, pedidos.order_id, pedidos.date, usuarios.fullname, usuarios.address, productos.dish FROM pedidos_productos
        JOIN pedidos ON pedidos_productos.order_id = pedidos.order_id
        JOIN usuarios ON pedidos.user_id = usuarios.user_id
        JOIN productos ON pedidos_productos.product_id = productos.product_id`, 
        {type: Sequelize.QueryTypes.SELECT})
            .then(result => console.log(result) || res.status(200).json(result).send('estos son todos los pedidos'))
            .catch(error => console.log('error ' + error) || res.status(400).json({error : 'fallo'}))
        console.log(ordersAndUser)
    },
    updateStatus: async (req,res) => {
        const status = req.body.status
        const {id} = req.params
        const changeStatus = db.query(`UPDATE pedidos_productos SET status = '${status}' WHERE id = ${id}`, {type: Sequelize.QueryTypes.UPDATE})
            .then(result => console.log(result) || res.status(200).json({result: 'pedido actualizado'}))
            .catch(error => console.log(error) || res.status(400).json({error : 'no se pudo actualizar'}))
        consolelog(changeStatus)
    },
    deleteOrder: (req, res) => {
        const {order_id} = req.params
        const cancelOrder = db.query(`DELETE FROM pedidos_productos WHERE order_id = ${order_id}`,{type: Sequelize.QueryTypes.DELETE})
            .then(result => console.log(result) || res.status(200).json({result: 'orden cancelada'}))
            .catch(error => console.log(error) || res.status(400).json({error : 'algo salio mal'}))
    }
}

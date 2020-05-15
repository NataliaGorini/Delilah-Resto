const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {getProducts, addProducts,updateProduct, deleteProduct} = require('./productos');
const {addNewUser, login, allUsers, updateUserData} = require('./users');
const {authenticateUser, isAdmin, checkOrderStatus} = require('./middlewares');
const {createOrder, seeOrderbyUser, allOrdersAdmin, updateStatus, deleteOrder} = require('./pedidos')


app.use(bodyParser.json());
app.listen(3000, () => {console.log('servidor iniciado')})


// PRODUCTOS ------------------
app.get('/productos', authenticateUser, getProducts)
app.post('/productos/producto', authenticateUser, isAdmin, addProducts)
app.put('/productos/:product_id',authenticateUser, isAdmin, updateProduct)
app.delete('/productos/producto/:product_id', authenticateUser, isAdmin, deleteProduct)

// USUARIO --------------------
app.post('/usuarios', addNewUser)
app.post('/usuarios/login', login)
app.get('/usuarios', authenticateUser, isAdmin, allUsers)
app.put('/usuarios/usuario/:user_id', authenticateUser, updateUserData)

//PEDIDOS ----------------------
app.get('/pedidos', authenticateUser,isAdmin, allOrdersAdmin)
app.get('/pedidos/pedido/:order_id', authenticateUser, seeOrderbyUser)
app.post('/pedidos/pedido', authenticateUser,createOrder)

//PEDIDOS-PRODUCTOS ADMIN -----------------
app.put('/pedidos/pedido/:id', authenticateUser, isAdmin, updateStatus)
app.delete('/pedidos/pedido/:order_id', authenticateUser, checkOrderStatus, deleteOrder)

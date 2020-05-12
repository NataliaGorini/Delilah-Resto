# Delilah-Resto
Rest API using express, nodejs, MySQL and Javascript
info:
  description: "Add user, create orders and manage them with MySQL db"
  version: "1.0.0"
  title: "Delilah Resto"
  contact:
    email: "natygorini@gmail.com"
basePath: "/v2"

Configure your express server after install NodeJS:
  - npm install express
  - requiere your express server. 
    Example: const express = require('express');
             const app = express();
  - Then you must put your server listening by selecting a port:
    Example: app.listen(3000, () => {console.log('starting')})
  NOTE---- THIS API IS USING LOCAL HOST 

API DOCUMENTATION

tags:
- name: "products"
  description: "Everything about products"
- name: "orders"
  description: "Access to user's orders"
- name: "user"
  description: "Operations about user"
schemes:
- "http"
paths:
  /productos:
    get:
      tags:
      - "productos"
      summary: "Show all products"
      description: "For all users"
      operationId: "getProducts"
      consumes:
      - "application/json"
      produces:
      - "application/json"
      parameters:
      - in: "body"
        name: "body"
        required: true
        schema:
          $ref: "#/definitions/Producto"
      responses:
        "405":
          description: "Invalid input"
      security:
      - delilah_auth:
        - "write:producto, usuario or pedidos"
        - "read:productos"
  /productos/producto:
    post:
      tags:
      - "producto"
      summary: "Create a new product"
      description: "Only for Admin"
      operationId: "addProduct"
      consumes:
      - "application/json"
      produces:
      - "application/json"
      parameters:
      - in: "body"
        name: "body"
        description: "Product object that needs to be added to the store"
        required: true
        schema:
          $ref: "#/definitions/Producto"
      responses:
        "405":
          description: "Invalid input"
      security:
      - delilah_auth:
        - "write:products"
        - "read:products"
  /productos/producto/{productId}:
      put:
        tags:
        - "producto"
        summary: "Update an existing product"
        description: "Update the price. Only for Admin"
        operationId: "updateProduct"
        consumes:
        - "application/json"
        produces:
        - "application/json"
        parameters:
        - name: "Admin token"
          in: "header"
          required: true
          type: "string"
        - name: "productId"
          in: "path"
          description: "Product id to delete"
          required: true
          type: "integer"
          format: "int64"
          schema:
            $ref: "#/definitions/Producto"
        responses:
          "400":
            description: "You are not allow to do this"
          "200":
            description: "Product Updated"
        security:
        - delilah_auth:
          - "write:products"
          - "read:products"
      delete:
        tags:
        - "producto"
        summary: "Deletes a product"
        description: ""
        operationId: "deleteProduct"
        produces:
        - "application/json"
        parameters:
        - name: "Admin token"
          in: "header"
          required: true
          type: "string"
        - name: "productId"
          in: "path"
          description: "Product id to delete"
          required: true
          type: "integer"
          format: "int64"
        responses:
          "400":
            description: "Product not found"
          "200":
            description: "Product deleted"
        security:
        - delilah_auth:
          - "write: productos"
          - "read:productos"
  /pedidos/pedido:
    post:
      tags:
      - "pedidos"
      summary: "Place an order for a product"
      description: ""
      operationId: "placeOrder"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - in: "body"
        name: "body"
        description: "order placed for purchasing the product"
        required: true
        schema:
          $ref: "#/definitions/Pedidos"
      responses:
        "200":
          description: "successful operation"
          schema:
            $ref: "#/definitions/Pedidos"
        "400":
          description: "Invalid Order"
  /pedidos/pedido/{pedidoId}:
    get:
      tags:
      - "pedidos"
      summary: "Find purchase order by ID"
      operationId: "getOrderById"
      produces:
      - "application/json"
      parameters:
      - name: "pedidoId"
        in: "path"
        description: "ID of pet that needs to be fetched"
        required: true
        type: "integer"
        maximum: 10.0
        minimum: 1.0
        format: "int64"
      responses:
        "200":
          description: "successful operation"
          schema:
            $ref: "#/definitions/Pedidos"
        "400":
          description: "Order not found"
    delete:
      tags:
      - "store"
      summary: "Delete purchase order by ID"
      description: "For valid response try integer IDs with positive integer value.         Negative or non-integer values will generate API errors"
      operationId: "deleteOrder"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "pedidoId"
        in: "path"
        description: "ID of the order that needs to be deleted"
        required: true
        type: "integer"
        minimum: 1.0
        format: "int64"
      responses:
        "200":
          description: "Order canceled"
        "400":
          description: "Order not found"
  /usuarios:
    post:
      tags:
      - "user"
      summary: "Create user"
      description: "This can only be done by the logged in user."
      operationId: "createUser"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - in: "body"
        name: "body"
        description: "Created user object"
        required: true
        schema:
          $ref: "#/definitions/Usuario"
      responses:
        "200":
          description: "successful operation"
          schema:
            type: "string"
          headers:
            X-Rate-Limit:
              type: "integer"
              format: "int32"
              description: "calls per hour allowed by the user"
            X-Expires-After:
              type: "string"
              format: "date-time"
              description: "date in UTC when token expires"
        "400":
          description: "Invalid data"
  /usuarios/login:
    get:
      tags:
      - "user"
      summary: "Logs user into the system"
      description: ""
      operationId: "loginUser"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "nickname"
        in: "body"
        description: "The user name for login"
        required: true
        type: "string"
      - name: "password"
        in: "query"
        description: "The password for login in clear text"
        required: true
        type: "string"
      responses:
        "200":
          description: "successful operation"
          schema:
            type: "string"
          headers:
            X-Rate-Limit:
              type: "integer"
              format: "int32"
              description: "calls per hour allowed by the user"
            X-Expires-After:
              type: "string"
              format: "date-time"
              description: "date in UTC when token expires"
        "400":
          description: "Invalid username/password supplied"
  /usuarios/usuario/{userid}:
    put:
      tags:
      - "user"
      summary: "Updated user"
      description: "This can only be done by the logged in user."
      operationId: "updateUser"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - name: "username"
        in: "path"
        description: "name that need to be updated"
        required: true
        type: "string"
      - name: "userId"
        in: "body"
        description: "Updated user object"
        required: true
        schema:
          $ref: "#/definitions/Usuario"
      responses:
        "400":
          description: "Invalid user supplied"
        "404":
          description: "User not found"
    delete:
      tags:
      - "user"
      summary: "Delete user"
      description: "This can only be done by the Administrator."
      operationId: "deleteUser"
      produces:
      - "application/json"
      parameters:
      - name: "nickname"
        in: "path"
        description: "The nickname that needs to be deleted"
        required: true
        type: "string"
      - name: "password"
        in: "body"
        description: "User password"
        required: true
      - name: "userId"
        in: "path"
        description: "UserId"
        required: true
        schema:
          $ref: "#/definitions/Usuario"
      responses:
        "200":
          description: "Data deleted"
        "400":
          description: "User not found"
securityDefinitions:
  delilah_auth:
    type: "oauth2"
    flow: "implicit"
    authorizationUrl: "https://github.com/NataliaGorini/Proyecto-Delilah"
    scopes:
      write: "producto, usuario or pedidos"
      read: "read productos or pedidos"
  api_key:
    type: "apiKey"
    name: "api_key"
    in: "header"
definitions:
  Pedidos:
    type: "object"
    properties:
      id:
        type: "integer"
        format: "int64"
      userId:
        type: "integer"
        format: "int64"
      productId:
        type: "integer"
        format: "int32"
  Usuario:
    type: "object"
    properties:
      id:
        type: "integer"
        format: "int64"
      nickname:
        type: "string"
      fullname:
        type: "string"
      password:
        type: "string"
      email:
        type: "string"
      phone:
        type: "string"
      address:
        type: "string"
      isAdmin:
        type: "boolean"
    xml:
      name: "User"
  Producto:
    type: "object"
    required:
    - "productId"
    - "name"
    - "ingredients"
    - "price"
    properties:
      id:
        type: "integer"
        format: "int64"
      category:
        $ref: "#/definitions/Producto"
      name:
        type: "string"
      productId:
        type: "string"
    xml:
      name: "Pet"
  ApiResponse:
    type: "object"
    properties:
      code:
        type: "integer"
        format: "int32"
      type:
        type: "string"
      message:
        type: "string"

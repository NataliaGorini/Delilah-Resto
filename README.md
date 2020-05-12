# Delilah-Resto
Rest API using express, nodejs, MySQL and Javascript
info:
  description: "Add user, create orders and manage them with MySQL db"
  version: "1.0.0"
  title: "Delilah Resto"
  contact:
    email: "natygorini@gmail.com"
basePath: "/v2"

SERVER:
Configure your express server after install NodeJS:
  - npm install express
  - requiere your express server. 
    Example: const express = require('express');
             const app = express();
  - Then you must put your server listening by selecting a port:
    Example: app.listen(3000, () => {console.log('starting')})
  NOTE---- THIS API IS USING LOCAL HOST 

METHODS:
 - GET|POST|DELETE|PUT

TAGS:
- name: "products"
  description: "Everything about products"
- name: "orders"
  description: "Access to user's orders"
- name: "user"
  description: "Operations about user"

SCHEMES:
- "http"

RESPONSE:
 -JSON
 
--- YOU CAN FIND COMPLETE DOCUMENTATION WITH SCHEMES, PATH AND MORE ON THE YAML FILE ON THE REPOSITORY ---

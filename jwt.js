"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var node_fs_1 = require("node:fs");
var privateKey = (0, node_fs_1.readFileSync)('./private.key', 'utf8');
var token = jwt.sign({ userid: '12', }, privateKey, { algorithm: 'RS256', expiresIn: "1h" });
console.log(privateKey);
console.log(token);

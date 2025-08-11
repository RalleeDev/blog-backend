import * as jwt from 'jsonwebtoken';
import { readFileSync }from 'node:fs';

const privateKey = readFileSync('./private.key', 'utf8');
const token = jwt.sign({ userid: '12', }, privateKey, { algorithm: 'RS256', expiresIn: "1h" });

console.log(privateKey);
console.log(token);

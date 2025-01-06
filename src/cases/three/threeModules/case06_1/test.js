/** 接口demo
package.json
{
  "type": "module",
  "dependencies": {
    "crypto": "^1.0.1",
    "crypto-js": "^4.2.0",
    "crypto.js": "^3.3.1",
    "echarts": "^5.5.1",
    "express": "^4.21.2",
    "fs": "^0.0.1-security",
    "jsencrypt": "^3.3.2",
    "node-fetch": "^3.3.2",
    "path": "^0.12.7"
  }
}
 */
// const express = require('express');
import express from 'express';
import fs from "fs";
import path from 'node:path'
import { fileURLToPath } from 'node:url';
import crypto from 'crypto';
// const fetch = require('node-fetch');
const app = express();
const port = 3000;

// 文件路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'Stork.glb');


// 加密用的密钥和初始化向量 (IV)，需要保密
const secretKey = 'mysecretkey12345'; // 16 字节的密钥 (128 位)
const iv = crypto.randomBytes(16);  // 16 字节的初始化向量

// AES 加密函数
function encryptData(data) {
    const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(secretKey), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted;
}

app.get('/getApi/getBlob', async (req, res) => {
    try {
        const data = await fs.promises.readFile(filePath);
        // 加密数据
        const encryptedData = encryptData(data);
        // 设置正确的 Content-Type 和响应头
        // res.setHeader('Content-Type', 'model/gltf-binary');
        res.setHeader('Content-Type', 'application/octet-stream');  // 通用二进制流
        res.setHeader('x-iv', iv.toString('hex'));  // 返回 IV 以便前端解密
        res.setHeader('secretkey', secretKey);  // 返回 IV 以便前端解密
        res.send(encryptedData);
    } catch (error) {
        console.error('Error fetching the file:', error);
        res.status(500).send('Internal Server Error');
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

import CryptoJS from 'crypto-js';

export function cryptoAES(response: any) {
    // 获取加密数据和 IV
    const encryptedData: any = new Uint8Array(response.data);
    // const ivHex = response.headers['x-iv']; // 获取响应头中的 IV
    // 解析 IV 为 CryptoJS 对象
    // const iv = CryptoJS.enc.Hex.parse(ivHex);
    // 解密过程
    const secretKey = 'mysecretkey12345';  // 与后端一致的密钥
    // 将加密数据转换为 Base64 编码（CryptoJS 需要的格式）
    // const encryptedBase64 = btoa(String.fromCharCode.apply(null, encryptedData));
    const encryptedBase64 = arrayBufferToBase64(encryptedData.buffer);
    // 使用 AES 解密
    // const decryptedData = CryptoJS.AES.decrypt(encryptedBase64, CryptoJS.enc.Utf8.parse(secretKey), { iv: iv });
    const decryptedData = CryptoJS.AES.decrypt(encryptedBase64, CryptoJS.enc.Utf8.parse(secretKey), { iv: CryptoJS.enc.Utf8.parse(''), mode: CryptoJS.mode.ECB });
    // 将解密后的数据转换成 Uint8Array
    const decryptedArray = new Uint8Array(decryptedData.sigBytes); // 获取解密结果的字节数
    for (let i = 0; i < decryptedData.sigBytes; i++) {
        decryptedArray[i] = decryptedData.words[i >>> 2] >>> ((3 - (i % 4)) * 8) & 0xff;
    }
    // 转换为 ArrayBuffer
    const decryptedBuffer = decryptedArray.buffer;
    return decryptedBuffer;
}

// 将 Uint8Array 转换为 Base64 编码
function arrayBufferToBase64(buffer: any) {
    const uint8Array = new Uint8Array(buffer);
    let binary = '';
    uint8Array.forEach(byte => {
        binary += String.fromCharCode(byte);
    });
    return window.btoa(binary);
}


// 解密 Base64 数据 (假设是 AES 解密)
export function decryptBase64(response: any) {
    const secretKey = 'mysecretkey12345';  // 与后端一致的密钥
    const ivHex = response.headers['x-iv']; // 获取响应头中的 IV
    // 解析 IV 为 CryptoJS 对象
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    // 从 Base64 编码中解码为字节数组
    const encryptedData = CryptoJS.enc.Base64.parse(response.data);

    // 解密数据
    const bytes = CryptoJS.AES.decrypt({ ciphertext: encryptedData }, CryptoJS.enc.Utf8.parse(secretKey), { iv: iv });

    // 将解密后的字节数组转回 Base64 字符串
    const decryptedBase64 = bytes.toString(CryptoJS.enc.Base64);
    return decryptedBase64;
}

// 将 Base64 字符串转换为 ArrayBuffer
export function base64ToArrayBuffer(base64: any) {
    const binaryString = atob(base64); // 解码 Base64
    console.log(binaryString);

    const length = binaryString.length;
    const arrayBuffer = new ArrayBuffer(length);
    const uint8Array = new Uint8Array(arrayBuffer);

    // 将解码后的字符转为字节数组
    for (let i = 0; i < length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }
    console.log(uint8Array);
    console.log(arrayBuffer);

    return arrayBuffer;
}
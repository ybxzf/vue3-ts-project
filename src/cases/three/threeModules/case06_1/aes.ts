import CryptoJS from 'crypto-js';

export function cryptoAES(response: any) {
    // 获取加密数据和 IV
    const encryptedData: any = new Uint8Array(response.data);
    const ivHex = response.headers['x-iv']; // 获取响应头中的 IV
    // 解析 IV 为 CryptoJS 对象
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    // 解密过程
    const secretKey = 'mysecretkey12345';  // 与后端一致的密钥
    // 将加密数据转换为 Base64 编码（CryptoJS 需要的格式）
    // const encryptedBase64 = btoa(String.fromCharCode.apply(null, encryptedData));
    const encryptedBase64 = arrayBufferToBase64(encryptedData.buffer);
    // 使用 AES 解密
    const decryptedData = CryptoJS.AES.decrypt(encryptedBase64, CryptoJS.enc.Utf8.parse(secretKey), { iv: iv });
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
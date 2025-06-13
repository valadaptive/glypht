const bytesToHex = (bytes: ArrayBuffer | Uint8Array): string => {
    const arr = bytes instanceof ArrayBuffer ? new Uint8Array(bytes) : bytes;
    let result = '';
    for (let i = 0; i < arr.length; i++) {
        const byte = arr[i];
        if (byte < 16) result += '0';
        result += byte.toString(16);
    }
    return result;
};

export default bytesToHex;

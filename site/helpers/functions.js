// Generate the code for API
module.exports.randomToken = (length) => {
    const charset = 'abcdefghijklmnopqrstufwxyzABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890';
    let result = '';

    for (let i = length; i > 0; --i) {
        result += charset[Math.floor(Math.random() * charset.length)];
    }
    return result;
};

// Check the connecting IP for Admin Dashboard
module.exports.checkIP = (req) => {
    return req.ip ||
        req._remoteAddress ||
        (req.connection && req.connection.remoteAddress) ||
        undefined;
};
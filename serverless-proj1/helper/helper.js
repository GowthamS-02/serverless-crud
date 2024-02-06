module.exports.response = (code, data, msg) => {
    return {
        statusCode: code,
        body: JSON.stringify(data),
        message: msg
    }
}


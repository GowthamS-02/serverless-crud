module.exports.response = (code, data, msg) => {
    return {
        statusCode: code,
        body: msg
    }
}
module.exports.res2 = (code, data, msg) => {
    return {
        statusCode: code,
        body: JSON.stringify(data)
    }
}
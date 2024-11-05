function responseJson(res, data = null, message = "Success", status = 200) {
    if (res && res.status) {
        res.status(status).json({
            message,
            data,
        });
    } else {
        console.error("res is undefined or invalid in responseJson.");
    }
}

module.exports = { responseJson };

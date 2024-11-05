const { responseJson } = require("..//utils/http");

exports.errorHandling = (err, req, res, next) => {
    if (err?.name === "bad_request") {
        responseJson(res, null, "bad request", 400);
    }
    console.log(err?.message);
    responseJson(res,null, "internal_server_error", 500);
    return;
};

//invalid input
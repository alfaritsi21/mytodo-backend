const jwt = require("jsonwebtoken");
const helper = require("../helper");

module.exports = {
  authorization: (request, response, next) => {
    let token = request.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, "RAHASIA", (error, result) => {
        console.log(error);
        if (
          (error && error.name === "JsonWebTokenError") ||
          (error && error.name === "TokenExpiredError")
        ) {
          return helper.response(response, 403, error.message);
        } else {
          request.token = result;
          next();
        }
      });
    } else {
      return helper.response(response, 400, "Please login first !");
    }
  },
  checkRole: (request, response, next) => {
    let token = request.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      const payload = jwt.verify(token, "RAHASIA");
      if (payload.user_role !== 1) {
        return helper.response(response, 400, "Unauthorized");
      }
      next();
    } else {
      return helper.response(response, 400, "Please login first !");
    }
  },
};

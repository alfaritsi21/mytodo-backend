const bcrypt = require("bcrypt");
const helper = require("../helper");
const jwt = require("jsonwebtoken");
const { postUser, checkUsername, getAll, update, deleteData, checkConfirmed } = require("../model/users");

const checkPassword = (password) => {
  let decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if (password.match(decimal)) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  registerUser: async (request, response) => {
    const { username, password, } = request.body;
    const checkName = await checkUsername(username);

    if (!checkPassword(password)) {
      return helper.response(
        response,
        400,
        "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
      );
    } else if (!checkName.length < 1) {
      return helper.response(
        response,
        400,
        "Username has been taken, try another username"
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(password, salt);

    const setData = {
      username,
      password: encryptPassword,
      role: 2,
    };
    try {
      const result = await postUser(setData);
      return helper.response(response, 200, "Success Register User", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  loginUser: async (request, response) => {
    try {
      const { username, password } = request.body;
      const checkDataUser = await checkUsername(username);

      if (checkDataUser.length >= 1) {
        const checkPassword = bcrypt.compareSync(
          password,
          checkDataUser[0].password
        )
        if (checkPassword) {
          const {
            id,
            username,
            role,
          } = checkDataUser[0];
          let payload = {
            id,
            username,
            role,
          };
          const token = jwt.sign(payload, "RAHASIA", { expiresIn: "24h" });
          payload = { ...payload, token };
          return helper.response(response, 200, "Success Login !", payload);
        } else {
          return helper.response(response, 400, "Wrong Password !");
        }
      } else {
        return helper.response(
          response,
          400,
          "Account not registered or Waiting for Approval !"
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  getAll: async (request, response) => {
    try {
      const result = await getAll();
      return helper.response(response, 200, "Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  update: async (request, response) => {
    const { username, password, role, confirmed } = request.body;
    const id = request.params.id;

    const setData = {
      confirmed,
      updated_at: new Date()
    };
    try {
      const result = await update(setData, id);
      return helper.response(response, 200, "Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  deleteData: async (request, response) => {
    const id = request.params.id;

    try {
      const result = await deleteData(id);
      return helper.response(response, 200, "Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
};

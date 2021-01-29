const connection = require("../config/mysql");

module.exports = {
  getAll: (user_id) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT todos.*, labels.label from todos LEFT JOIN labels ON todos.label_id = labels.id where user_id = ?", user_id, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  getById: (user_id) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * from todos where user_id = ?", user_id, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  create: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO todos SET ?", setData, (error, result) => {
        if (!error) {
          const newResult = {
            ...setData,
          };
          resolve(newResult);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  update: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE todos SET ? where id = ?", [setData, id], (error, result) => {
        if (!error) {
          const newResult = {
            ...setData,
          };
          resolve(newResult);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM todos where id = ?", id, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
};

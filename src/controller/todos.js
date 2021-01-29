const helper = require("../helper");
const { getAll, getById, create, update, deleteData } = require("../model/todos");

module.exports = {
  getAll: async (request, response) => {
    const user_id = request.token.id;
    try {
      const result = await getAll(user_id);
      return helper.response(response, 200, "Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  getById: async (request, response) => {
    const user_id = request.params.id;

    try {
      const result = await getById(user_id);
      return helper.response(response, 200, "Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  create: async (request, response) => {
    console.log(request.token.id);
    const { label_id, task } = request.body;

    const setData = {
      user_id: request.token.id,
      label_id,
      task,
      updated_at: new Date()
    };
    try {
      const result = await create(setData);
      return helper.response(response, 200, "Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  update: async (request, response) => {
    const id = request.params.id;

    const setData = {
      completed: 1,
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

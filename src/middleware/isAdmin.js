const { decode } = require("jsonwebtoken");

const ManageUsersService = require("../composables/admin/ManageUsersService");

module.exports = {
  async isAdmin(to, from, next) {
    // fetch token from cookie
    const token = localStorage.getItem("token");

    // intercept role from decoded token
    const { email } = await decode(token);

    const user = await ManageUsersService.default.getUserByEmail(email);

    const isAdmin = user[1].isAdmin;

    // if admin next
    if (isAdmin) {
      next();

      // otherwise prompt na error
    } else {
      throw new Error("You are not allowed. No admin permission");
    }
  },
};

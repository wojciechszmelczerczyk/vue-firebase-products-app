const { decode } = require("jsonwebtoken");
const ManageUsersService = require("../composables/admin/ManageUsersService");

module.exports = {
  async verifyToken(to, from, next) {
    // no auth for login path
    if (to.path === "/login") {
      next();
      // otherwise verify token
    } else {
      // fetch token from cookie
      const token = localStorage.getItem("token");

      if (token) {
        // intercept email from token
        const { email } = await decode(token);

        // fetch user from db with email from token if exists ok, otherwise error
        const [isCorrect] = await ManageUsersService.default.getUserByEmail(
          email
        );

        if (isCorrect) {
          next();
        } else {
          next("/login");
        }
      } else {
        next("/login");
      }
    }
  },
};

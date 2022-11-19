const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const controllerUser = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api/app/all", controller.allAccess);
  app.get("/api/app/all", controller.allAccess);

  app.get("/api/app/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/app/superUser",
    [authJwt.verifyToken, authJwt.isSuperUser],
    controller.superUserBoard
  );

  app.get(
    "/api/app/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.put(
    "/api/app/editUser",
    [authJwt.verifyToken, authJwt.isSuperUser],
    controllerUser.editUser
  );
};

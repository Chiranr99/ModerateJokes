const { authJwt } = require("../middlewares")
const controller = require("../controllers/user.controller")
var router = require("express").Router()

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    app.get("/api/user/all", controller.allAccess)


    app.get(
        "/api/user/moderater", [authJwt.verifyToken, authJwt.isModerater],
        controller.adminBoard
    )
    app.get(
        "/api/user/normal", [authJwt.verifyToken, authJwt.isNormal],
        controller.cashierBoard
    )




    router.delete("/:username", controller.DeleteFromUser)

    router.put("/:username/:password", controller.updatePasswordByUserName)

    router.put("/:username", controller.updateByUsername)

    router.get("/", controller.findAllActive)

    router.get("/username/:username", controller.findByusername)

    app.use("/api/user", router)
}
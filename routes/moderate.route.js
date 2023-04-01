module.exports = app => {
    const moderate = require("../controllers/moderate.controller.js");

    var router = require("express").Router();

    router.post("/",moderate.create);
    router.get("/alljokes",moderate.findAll);
    router.get("/accept/:SId",moderate.moderateAccept);
    router.get("/reject/:SId",moderate.moderateReject);

    app.use('/api/moderate', router);
}
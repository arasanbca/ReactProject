const exp = require("express");
const { createOrder } = require("../Controller/OrderController");
const router = exp.Router();

router.route("/order").post(createOrder);

module.exports = router;
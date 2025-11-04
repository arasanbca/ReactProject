const exp = require("express");
const { getproduct, getSingleproduct } = require("../Controller/ProductController");
const router = exp.Router();

router.route("/products").get(getproduct);
router.route("/product/:id").get(getSingleproduct);

module.exports = router;
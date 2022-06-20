const express = require("express");
const router = express.Router();

// controllers
const { 
    create,
    list,
    remove,
    read,
    update,
    listBy,
    searchFilters
} = require("../controllers/product");
// middleware
const { auth, adminCheck } = require("../middleware/auth");

//@Endpoint     http://localhost:5000/api/product
router.post("/product", auth, adminCheck, create);
router.get("/product/:count", list);
router.delete("/product/:id", auth, adminCheck, remove);

//update
//http://localhost:5000/api/products
router.get("/products/:id", read);
router.put("/product/:id",auth, adminCheck, update);

router.post("/productby", listBy);

// Search
//@Endpoint     http://localhost:5000/api/search/filters
router.post('/search/filters',searchFilters)

module.exports = router;

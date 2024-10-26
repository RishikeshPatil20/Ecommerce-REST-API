import express from "express";
import ProductController from "../product/product.controller.js";
import basicauthorization from "../../middlewares/basicAuthorization.js";
import jwtAuth from "../../middlewares/jwtTokenAuthorization.js";
 
const productRouter = express.Router(); 
const productController = new ProductController();
// Define routes
productRouter.get("/", productController.getAllProducts);

productRouter.get("/filter", productController.filterProduct);
// productRouter.get('/:id', productController.getProductWithId);
productRouter.get("/:id", productController.getProductWithId);

productRouter.post("/", basicauthorization, productController.addProduct);

productRouter.post("/rate",productController.rateproduct);
productRouter.post("/rate/authenticate",jwtAuth,productController.rateproductWithAuthenticate);

productRouter.delete('/:id', (req, res) => {
    return res.status(200).json({
        success: true,
        data: "delete id request"
    });
});

// Export the correct router
export default productRouter;

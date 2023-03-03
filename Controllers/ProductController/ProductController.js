import express from "express";
import ProductService from "../../Services/ProductService/ProductService.js";

const ProductRouter = express.Router();
const service = new ProductService();

ProductRouter.post('/product', service.CreateProduct);
ProductRouter.get('/products', service.GetAll);
ProductRouter.get('/product/:id', service.GetById);
ProductRouter.get('/product-active', service.GetAllActiveProduct);
ProductRouter.get('/product-deleted', service.GetAllNotActiveProduct);
ProductRouter.put('/product/update', service.UpdateProduct);
ProductRouter.delete('/product/:id', service.DeleteProduct);

export default ProductRouter;
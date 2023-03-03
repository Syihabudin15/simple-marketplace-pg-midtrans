import Product from "../../Entities/ProductEntity/Product.js";
import Repository from "../../Repositories/Repository.js";

const repo = new Repository(Product);

class ProductService{

    async CreateProduct(req, res){
        try{
            var {name, description, stock, price} = req.body;
            if(name  == null ||
                 description == null ||
                 stock == null ||
                 price == null || price <= 0){
                    res.status(400).json({
                        msg: "field name, description, stock, price cannot be null and must higher than 0",
                        statusCode: 400
                    });
                 }
            var result = await repo.Save({
                name : name,
                description: description,
                stock: stock,
                price: price,
                isActive: true
            });
            res.status(201).json({
                msg: "Product has Added",
                statusCode: 201,
                data: result
            });
        }
        catch(err){
            res.status(500).json({msg: "Error while save product"});
        }
    }
    async GetAll(req, res){
        try{
            var result = await repo.GetAll();
            res.status(200).json({
                msg: "Success get all product",
                statusCode: 200,
                data: result
            });
        }
        catch(err){
            res.status(500).json({
                msg: "Error while get all product",
                statusCode: 500
            });
        }
    }
    async GetById(req, res){
        try{
            var result = await repo.GetById(req.params.id);
            if(result == null) res.status(404).json({msg: "Product Not Found", statusCode: 404});
            res.status(200).json({
                msg: "Get by id Success",
                statusCode: 200,
                data: result
            });
        }
        catch(err){
            res.status(500).json({
                msg: "Error While Getting Product by id",
                statuscode: 500
            });
        }
    }
    async GetAllActiveProduct(req, res){
        try{
            var result = await repo.GetAllByCriteria({isActive: true});
            res.status(200).json({
                msg: "Success get active product",
                statusCode: 200,
                data: result
            });
        }
        catch(err){
            res.status(500).json({msg: "Error while get active product", statusCode: 500});
        }
    }
    async GetAllNotActiveProduct(req, res){
        try{
            var result = await repo.GetAllByCriteria({isActive: false});
            res.status(200).json({
                msg: "success get not active product",
                statusCode: 200,
                data: result
            });
        }
        catch(err){
            res.status(500).json({msg: "Error while get not active product", statusCode: 500});
        }
    }
    async UpdateProduct(req, res){
        try{
            var result = await repo.Update(req.body);
            var getProduct = await repo.GetById(req.body.id);
            if(result[0] == 1){
                res.status(200).json({
                    msg: "Update Success",
                    statusCode: 200,
                    data: getProduct
                });
            }else if(result[0] == 0){
                res.status(404).json({
                    msg: "User Not Found",
                    statusCode: 404
                });
            }else{
                res.status(400).json({
                    msg: "Bad Request, your input data is same with before",
                    statusCode: 404
                });
            }
        }
        catch(err){
            res.status(500).json({msg: "Error While Update Product. "+err, statusCode: 500});
        }
    }
    async DeleteProduct(req, res){
        try{
            var findProduct = await repo.GetById(req.params.id);
            if(findProduct == null) res.status(404).json({msg: "Product not found", statusCode: 404});

            var updated = await repo.Update({
                id: findProduct.id,
                isActive: false
            });
            if(result[0] == 1){
                res.status(200).json({
                    msg: "Deleted Success",
                    statusCode: 200,
                    data: updated
                });
            }else{
                res.status(400).json({
                    msg: "Bad Request, your input data is same with before",
                    statusCode: 404
                });
            }
        }
        catch(err){
            res.status(500).json({msg: "Error while Delete Product. "+err, statusCode: 500});
        }
    }
    async GetForTransac(id){
        var result = await repo.GetById(id);
        return result;
    }
}

export default ProductService;
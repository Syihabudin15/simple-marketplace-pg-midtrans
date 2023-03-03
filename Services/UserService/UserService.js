import Repository from "../../Repositories/Repository.js";
import User from "../../Entities/UserEntity/User.js";

const repo = new Repository(User);

// User can access all path of this Endpont
class UserService{

    async SaveUser(value){
        try{
            var save = await repo.Save(value);
            return save;
        }
        catch(err){
            throw new Error(err);
        }
    }

    async UpdateUser(req, res){
        try{
            var result = await repo.Update(req.body);
            var getUser = await repo.GetById(req.body.id);
            if(result[0] == 1){
                res.status(200).json({
                    msg: "Update Success",
                    statusCode: 200,
                    data: getUser
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
            throw new Error(err);
        }
    }
    async GetMySelf(req, res){
        try{
            var result = await repo.GetByEmail(req.params.email);
            if(result == null) res.status(404).json({
                    msg: "User Not Found",
                    statusCode: 404,
                    data: null
            })
            res.status(200).json({
                msg: "Success get my self",
                statusCode: 200,
                data: result
            });
        }
        catch(err){
            throw new Error(err);
        }
    }
    async GetForTransac(id){
        var result = await repo.GetByIdWithInclude(id);
        return result;
    }
}

export default UserService;
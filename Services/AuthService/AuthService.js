import Credential from "../../Entities/Credential.js";
import Repository from "../../Repositories/Repository.js";
import UserService from "../UserService/UserService.js";

const repo = new Repository(Credential);
const userService = new UserService(); 

class AuthService{

    async SaveCredential(req, res){
        try{
            let {name, phone} = req.body;
            let {email, password} = req.body;
            if(name == null || phone == null || email == null || password == null){
                res.status(400).json({
                    msg: "Bad Request. cannot be null",
                    statusCode: 400
                });
            }
            var save = await repo.Save({
                email: email,
                password: password,
                role: "customer"
            });
            var saveUser = await userService.SaveUser({
                name: name,
                phone: phone,
                mCredentialId: save.id
            });

            res.status(201).json({
                msg: "Created. Register Success",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    role: save.role
                }
            });
        }
        catch(err){
            throw new Error(err);
        }
    }

    async Login(req, res){
        try{
            var findByEmail = await repo.GetByEmail(req.body.email);
            if(findByEmail == null) res.status(401).json({
                msg: "Un Authorized. Email not registered",
                statusCode: 401
            });
            if(findByEmail.password != req.body.password) res.status(401).json({
                msg: "Un Authorized. Wrong Password",
                statusCode: 401
            });
            res.json({
                msg: "Login Success",
                data: {
                    email: findByEmail.email,
                    role: findByEmail.role,
                    token: "Sample JWT Token"
                }
            });
        }
        catch(err){
            throw new Error(err);
        }
    }
}

export default AuthService;
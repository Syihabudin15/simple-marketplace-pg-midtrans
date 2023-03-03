import Credential from "../Entities/Credential.js";

class Repository{
    repos;
    constructor(repo){
        this.repos = repo;
    }

    async Save(data){
        var result = await this.repos.create(data);
        return result;
    }
    async SaveAll(data){
        var results = await this.repos.bulkCreate(data);
        return results;
    }
    async GetAll(){
        var results = await this.repos.findAll();
        return results;
    }
    async GetAllByCriteria(value){
        var result = await this.repos.findAll({where: value});
        return result;
    }
    async GetByEmail(email){
        var result = await this.repos.findOne({
            attributes: ['id', 'name', 'phone'],
            include: [{
                model: Credential,
                attributes: ['id', 'email', 'role'],
                where: {email: email}
            }]
        });
        return result;
    }
    async GetById(id){
        var result = await this.repos.findOne({where: {id: id}});
        return result;
    }
    async GetByIdWithInclude(id){
        var result = await this.repos.findOne({
            where: {id: id},
            attributes: ['id', 'name', 'phone'],
            include: [{
                model: Credential,
                attributes: ['id', 'email', 'role']
            }]
        });
        return result;
    }
    async Update(data){
        var result = await this.repos.update(data, {where: {id: data.id}});
        return result;
    }
    async Delete(id){
        await this.repos.destroy({where: {id: id}});
    }
}

export default Repository;
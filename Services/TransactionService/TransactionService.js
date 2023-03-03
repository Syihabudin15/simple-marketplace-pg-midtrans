import Transaction from "../../Entities/TransactionEntity/Transaction.js";
import Repository from "../../Repositories/Repository.js";

const repo = new Repository(Transaction);

class TransactionService{
    async CreateTransaction(value){
        var result = await repo.Save(value);
        return result;
    }
    async UpdateStatus(value){
        var result = await repo.Update(value);
        return result;
    }
}

export default TransactionService;
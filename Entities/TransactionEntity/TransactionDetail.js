import { DB, DataTypes } from "../DBConfig.js";
import Transaction from "./Transaction.js";
import Product from "../ProductEntity/Product.js";

const TransactionDetail = DB.define('t_transaction_detail', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false
});

TransactionDetail.belongsTo(Transaction);
TransactionDetail.belongsTo(Product);

await TransactionDetail.sync();
export default TransactionDetail;
import { DB, DataTypes } from "../DBConfig.js";
import User from "../UserEntity/User.js";

const Transaction = DB.define('t_transaction', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    paymentType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    referencePg: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending"
    }
},{
    timestamps: true
});

Transaction.belongsTo(User);
await Transaction.sync();
export default Transaction;
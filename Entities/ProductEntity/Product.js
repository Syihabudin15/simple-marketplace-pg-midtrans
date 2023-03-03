import { DB, DataTypes } from "../DBConfig.js";

const Product = DB.define('m_product', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
     isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
     }
}, {
    createdAt: false,
    updatedAt: false
});

await Product.sync();
export default Product;
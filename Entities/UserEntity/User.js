import { DB, DataTypes } from "../DBConfig.js";
import Credential from "../Credential.js";

const User = DB.define('m_user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    createdAt: false,
    updatedAt: false
});


User.belongsTo(Credential)

await User.sync();
export default User;
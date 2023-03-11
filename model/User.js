import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js'

class User extends Model{}

User.init({
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    senha: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: "User",
    timestamps: true
});

export default User;
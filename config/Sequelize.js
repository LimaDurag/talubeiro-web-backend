import Sequelize from "sequelize";

const sequelize = new Sequelize("talubeiro-db", "user", "password", {
    dialect: "sqlite",
    host: "./dev.sqlite"
})

export default sequelize;
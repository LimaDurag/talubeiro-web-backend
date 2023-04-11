import User from "../model/User.js";

const userController = {
    all: async function (request, response){
        try {
            const users = await User.findAll();
            response.status(200).json(users);
        } catch (error) {
            response.status(400).json(error);
        }
    },
    create: async function (request, response){
        try {
            const user = await User.create(request.body);
            user.status = "ACTIVE";
            response.status(201).json(await user.save());
        } catch (error) {
            response.status(400).json(error);
        }
    },
    update: async function (request, response){
        try {
            const {name, email, senha, status, avatar_link} = request.body;
            const id = request.params.id;

            const user = await User.findOne({where: { id } });

            if(!user){
                response.status(400).json("User not found!!");
            }

            user.name = name;
            user.email = email;
            user.senha = senha;
            user.status = status;
            user.avatar_link = avatar_link;

            const savedUser = await user.save();
            response.status(200).json(savedUser);
        } catch (error) {
            response.status(400).json(error);
        }
    },
    deactivate: async function (request, response){
        try {
            const id = request.params.id;

            const user = await User.findOne({where: { id } });

            if(!user){
                response.status(400).json("User didn't find!!");
            }

            user.status = "DEACTIVATE";

            const savedUser = await user.save();
            response.status(200).json(savedUser);
        } catch (error) {
            response.status(400).json(error);
        }
    },
    findOne:  async function (request, response){
        try {
            const id = request.params.id;
            const user = await User.findOne({where: { id } });

            if(!user) response.status(400).json("User didn't find!!");
            else response.status(200).json(user);
        } catch (error) {
            response.status(400).json(error);
        }
    },
    findOneByToken: async function (request, response){
        try {
            const token = request.params.token;
            const user = await User.findOne({where: { token: token } });

            if(!user) response.status(400).json("User didn't find!!");
            else response.status(200).json(user);
        } catch (error) {
            response.status(400).json(error);
        }
    },
} 

export default userController;
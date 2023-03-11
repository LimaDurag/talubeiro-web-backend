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
            response.status(200).json(user);
        } catch (error) {
            response.status(400).json(error);
        }
    } 
} 

export default userController;
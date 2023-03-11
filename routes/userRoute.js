import express from 'express';
import userController from "../controller/UserController.js";
const router = express.Router();


/* GET users listing. */
router.get('/', userController.all);

router.post('/', userController.create);

export default router;

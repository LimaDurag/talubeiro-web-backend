import express from 'express';
import userController from "../controller/UserController.js";
const router = express.Router();


/* GET users listing. */
router.get('/', userController.all);
router.get('/:id', userController.findOne);
router.get('/:token', userController.findOneByToken);
router.put('/:id', userController.update);
router.put('/:id/deactivate', userController.deactivate);
router.post('/', userController.create);

export default router;

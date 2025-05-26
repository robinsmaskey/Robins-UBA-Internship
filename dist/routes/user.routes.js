"use strict";
// import { Router } from 'express';
// import { UserController } from '../controllers/user.controller';
// import { UserService } from '../services/user.service';
// import { validate } from '../middlewares/validation.middleware';
// import { userValidation } from '../validations/user.validation';
Object.defineProperty(exports, "__esModule", { value: true });
// // Initialize dependencies
// const userService = new UserService();
// const userController = new UserController(userService); // Pass UserService instance
// const router = Router();
// // User Routes
// router.get('/', userController.getAllUsers.bind(userController));
// router.get('/:id', 
//   validate(userValidation.userIdParam, { source: 'params' }), 
//   userController.getUserById.bind(userController)
// );
// router.post('/', 
//   validate(userValidation.createUser), 
//   userController.createUser.bind(userController)
// );
// router.put('/:id', 
//   validate(userValidation.userIdParam, { source: 'params' }),
//   validate(userValidation.updateUser),
//   userController.updateUser.bind(userController)
// );
// router.delete('/:id', 
//   validate(userValidation.userIdParam, { source: 'params' }), 
//   userController.deleteUser.bind(userController)
// );
// export default router;
//New Code
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_service_1 = require("../services/user.service");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const user_validation_1 = require("../validations/user.validation");
// Initialize dependencies
const userService = new user_service_1.UserService();
const userController = new user_controller_1.UserController(userService);
const router = (0, express_1.Router)();
// Enhanced User Routes with proper validation and error handling
router.route('/')
    .get(userController.getAllUsers.bind(userController))
    .post((0, validation_middleware_1.validate)(user_validation_1.userValidation.createUser), userController.createUser.bind(userController));
router.route('/:id')
    .get((0, validation_middleware_1.validate)(user_validation_1.userValidation.userIdParam, { source: 'params' }), userController.getUserById.bind(userController))
    .put((0, validation_middleware_1.validate)(user_validation_1.userValidation.userIdParam, { source: 'params' }), (0, validation_middleware_1.validate)(user_validation_1.userValidation.updateUser), userController.updateUser.bind(userController))
    .delete((0, validation_middleware_1.validate)(user_validation_1.userValidation.userIdParam, { source: 'params' }), userController.deleteUser.bind(userController));
exports.default = router;

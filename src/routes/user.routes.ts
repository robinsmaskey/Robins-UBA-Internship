// // import { Router } from 'express';
// // import { UserController } from '../controllers/user.controller';
// // import { UserService } from '../services/user.service';
// // import { validate } from '../middlewares/validation.middleware';
// // import { userValidation } from '../validations/user.validation';

// // // Initialize dependencies
// // const userService = new UserService();
// // const userController = new UserController(userService); // Pass UserService instance

// // const router = Router();

// // // User Routes
// // router.get('/', userController.getAllUsers.bind(userController));

// // router.get('/:id', 
// //   validate(userValidation.userIdParam, { source: 'params' }), 
// //   userController.getUserById.bind(userController)
// // );

// // router.post('/', 
// //   validate(userValidation.createUser), 
// //   userController.createUser.bind(userController)
// // );

// // router.put('/:id', 
// //   validate(userValidation.userIdParam, { source: 'params' }),
// //   validate(userValidation.updateUser),
// //   userController.updateUser.bind(userController)
// // );

// // router.delete('/:id', 
// //   validate(userValidation.userIdParam, { source: 'params' }), 
// //   userController.deleteUser.bind(userController)
// // );

// // export default router;

// //New Code
// import { Router } from 'express';
// import { UserController } from '../controllers/user.controller';
// import { UserService } from '../services/user.service';
// import { validate } from '../middlewares/validation.middleware';
// import { userValidation } from '../validations/user.validation';

// // Initialize dependencies
// const userService = new UserService();
// const userController = new UserController(userService);

// const router = Router();

// // Enhanced User Routes with proper validation and error handling
// router.route('/')
//   .get(
//     userController.getAllUsers.bind(userController)
//   )
//   .post(
//     validate(userValidation.createUser),
//     userController.createUser.bind(userController)
//   );

// router.route('/:id')
//   .get(
//     validate(userValidation.userIdParam, { source: 'params' }),
//     userController.getUserById.bind(userController)
//   )
//   .put(
//     validate(userValidation.userIdParam, { source: 'params' }),
//     validate(userValidation.updateUser),
//     userController.updateUser.bind(userController)
//   )
//   .delete(
//     validate(userValidation.userIdParam, { source: 'params' }),
//     userController.deleteUser.bind(userController)
//   );

// export default router;

//New Code 2
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { validate } from '../middlewares/validation.middleware';
import { userValidation } from '../validations/user.validation';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/authorize.middleware';
import { Permission } from '../auth/permissions';

// Initialize dependencies
const userService = new UserService();
const userController = new UserController(userService);

const router = Router();

// Protected User Routes with authentication and authorization
router.route('/')
  .get(
    authenticate,
    authorize(Permission.USER_READ),
    userController.getAllUsers.bind(userController)
  )
  .post(
    authenticate,
    authorize(Permission.USER_CREATE),
    validate(userValidation.createUser),
    userController.createUser.bind(userController)
  );

router.route('/:id')
  .get(
    authenticate,
    authorize(Permission.USER_READ),
    validate(userValidation.userIdParam, { source: 'params' }),
    userController.getUserById.bind(userController)
  )
  .put(
    authenticate,
    authorize(Permission.USER_UPDATE),
    validate(userValidation.userIdParam, { source: 'params' }),
    validate(userValidation.updateUser),
    userController.updateUser.bind(userController)
  )
  .delete(
    authenticate,
    authorize(Permission.USER_DELETE),
    validate(userValidation.userIdParam, { source: 'params' }),
    userController.deleteUser.bind(userController)
  );

export default router;
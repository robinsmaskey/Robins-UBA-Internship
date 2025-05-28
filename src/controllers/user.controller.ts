// // import { Request, Response } from 'express';
// // import { UserDetails } from '../interfaces/user.interface';
// // import { UserService } from '../services/user.service';

// // export class UserController {
// //   private userService = new UserService();

// //   async createUser(req: Request, res: Response) {
// //     try {
// //       const user = await this.userService.createUser(req.body);
// //       res.status(201).json(user);
// //     } catch (error: any) {
// //       res.status(400).json({ error: error.message });
// //     }
// //   }

// //   async getAllUsers(req: Request, res: Response) {
// //     try {
// //       const users = await this.userService.getAllUsers();
// //       res.status(200).json(users);
// //     } catch (error: any) {
// //       res.status(500).json({ error: error.message });
// //     }
// //   }

// //   async getUserById(req: Request, res: Response) {
// //     try {
// //       const user = await this.userService.getUserById(req.params.id);
// //       res.status(200).json(user);
// //     } catch (error: any) {
// //       res.status(404).json({ error: error.message });
// //     }
// //   }

// //   async updateUser(req: Request, res: Response) {
// //     try {
// //       const updatedUser = await this.userService.updateUser(req.params.id, req.body);
// //       res.status(200).json(updatedUser);
// //     } catch (error: any) {
// //       const status = error.message === 'User not found' ? 404 : 400;
// //       res.status(status).json({ error: error.message });
// //     }
// //   }

// //   async deleteUser(req: Request, res: Response) {
// //     try {
// //       await this.userService.deleteUser(req.params.id);
// //       res.status(204).send();
// //     } catch (error: any) {
// //       res.status(404).json({ error: error.message });
// //     }
// //   }

// //   async getUsersByCertification(req: Request, res: Response) {
// //     try {
// //       const certified = req.query.certified === 'true';
// //       const users = await this.userService.getUsersByCertification(certified);
// //       res.status(200).json(users);
// //     } catch (error: any) {
// //       res.status(400).json({ error: error.message });
// //     }
// //   }
// // }

// //New Code
// // import { Request, Response } from 'express';
// // import { UserService } from '../services/user.service';
// // import { UserDetails } from '../interfaces/user.interface';

// // export class UserController {
// //   constructor(private userService: UserService) {}

// //   async createUser(req: Request, res: Response) {
// //     try {
// //       const userData = req.body;
// //       const user = await this.userService.createUser(userData);
// //       res.status(201).json(user);
// //     } catch (error: any) {
// //       if (error.message.includes('already exists')) {
// //         res.status(409).json({ error: error.message });
// //       } else if (error.message.includes('required')) {
// //         res.status(400).json({ error: error.message });
// //       } else {
// //         res.status(500).json({ error: 'Internal server error' });
// //       }
// //     }
// //   }

// //   async getAllUsers(req: Request, res: Response) {
// //     try {
// //       const users = await this.userService.getAllUsers();
// //       res.status(200).json(users);
// //     } catch (error: any) {
// //       res.status(500).json({ error: 'Internal server error' });
// //     }
// //   }

// //   async getUserById(req: Request, res: Response) {
// //     try {
// //       const user = await this.userService.getUserById(req.params.id);
// //       res.status(200).json(user);
// //     } catch (error: any) {
// //       if (error.message.includes('not found')) {
// //         res.status(404).json({ error: error.message });
// //       } else {
// //         res.status(500).json({ error: 'Internal server error' });
// //       }
// //     }
// //   }

// //   async updateUser(req: Request, res: Response) {
// //     try {
// //       const updatedUser = await this.userService.updateUser(
// //         req.params.id,
// //         req.body
// //       );
// //       res.status(200).json(updatedUser);
// //     } catch (error: any) {
// //       if (error.message.includes('not found')) {
// //         res.status(404).json({ error: error.message });
// //       } else if (error.message.includes('Cannot modify')) {
// //         res.status(400).json({ error: error.message });
// //       } else {
// //         res.status(500).json({ error: 'Internal server error' });
// //       }
// //     }
// //   }

// //   async deleteUser(req: Request, res: Response) {
// //     try {
// //       await this.userService.deleteUser(req.params.id);
// //       res.status(204).send();
// //     } catch (error: any) {
// //       if (error.message.includes('not found')) {
// //         res.status(404).json({ error: error.message });
// //       } else {
// //         res.status(500).json({ error: 'Internal server error' });
// //       }
// //     }
// //   }

// // }

// //New Code 2
// import { Request, Response } from 'express';
// import { UserService } from '../services/user.service';
// import { UserRole } from '../entity/user';
// import { Permission } from '../auth/permissions';

// export class UserController {
//   constructor(private userService: UserService) {}

//   async createUser(req: Request, res: Response) {
//     try {
//       // Only admins can create users (enforced at route level)
//       const userData = req.body;
      
//       // Prevent role elevation unless admin
//       if (userData.role && req.user?.role !== UserRole.ADMIN) {
//         return res.status(403).json({ error: 'Only admins can assign roles' });
//       }

//       // Set default role if not provided
//       if (!userData.role) {
//         userData.role = UserRole.USER;
//       }

//       const user = await this.userService.createUser(userData);
//       res.status(201).json(user);
//     } catch (error: any) {
//       if (error.message.includes('already exists')) {
//         res.status(409).json({ error: error.message });
//       } else if (error.message.includes('required')) {
//         res.status(400).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: 'Internal server error' });
//       }
//     }
//   }

//   async getAllUsers(req: Request, res: Response) {
//     try {
//       // Admins see all users, others see only themselves (enforced in service)
//       const users = await this.userService.getAllUsers(req.user);
//       res.status(200).json(users);
//     } catch (error: any) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

//   // async getUserById(req: Request, res: Response) {
//   //   try {
//   //     // Users can only view their own profile unless admin
//   //     if (req.params.id !== req.user?.id && req.user?.role !== UserRole.ADMIN) {
//   //       return res.status(403).json({ error: 'Unauthorized access' });
//   //     }

//   //     const user = await this.userService.getUserById(req.params.id);
//   //     res.status(200).json(user);
//   //   } catch (error: any) {
//   //     if (error.message.includes('not found')) {
//   //       res.status(404).json({ error: error.message });
//   //     } else {
//   //       res.status(500).json({ error: 'Internal server error' });
//   //     }
//   //   }
//   // }

//   async getUserById(req: Request, res: Response) {
//     try {
//         const requestedUserId = req.params.id;
//         const currentUser = req.user;

//         if (!currentUser) {
//             return res.status(401).json({
//                 error: 'Unauthorized',
//                 message: 'Authentication required'
//             });
//         }

//         // Convert both IDs to strings for consistent comparison
//         const currentUserId = (currentUser.id);
//         const requestedId = String(requestedUserId).trim(); // Added trim() to remove any whitespace

//         // Debug log (keep temporarily)
//         console.log('Comparing IDs:', {
//             currentUserId,
//             requestedId,
//             types: {
//                 current: typeof currentUser.id,
//                 requested: typeof requestedUserId
//             }
//         });

//         // Admins can access any profile
//         if (currentUser.role === UserRole.ADMIN) {
//             const user = await this.userService.getUserById(requestedId);
//             return res.status(200).json(user);
//         }

//         // Regular users can only access their own profile
//         if (currentUserId !== requestedId) {
//             return res.status(403).json({
//                 error: 'Forbidden',
//                 message: `ID mismatch. Your ID: ${currentUserId}, Requested ID: ${requestedId}`
//             });
//         }

//         // Return the requested user
//         const user = await this.userService.getUserById(requestedId);
//         return res.status(200).json(user);

//     } catch (error: any) {
//         if (error.message.includes('not found')) {
//             return res.status(404).json({ error: error.message });
//         }
//         console.error('getUserById error:', error);
//         return res.status(500).json({ 
//             error: 'Internal server error',
//             details: process.env.NODE_ENV === 'development' ? error.message : undefined
//         });
//     }
// }

//   async updateUser(req: Request, res: Response) {
//     try {
//       // Users can only update their own profile unless admin
//       if (req.params.id !== req.user?.id && req.user?.role !== UserRole.ADMIN) {
//         return res.status(403).json({ error: 'Unauthorized access' });
//       }

//       // Prevent role modification unless admin
//       if (req.body.role && req.user?.role !== UserRole.ADMIN) {
//         return res.status(403).json({ error: 'Only admins can modify roles' });
//       }

//       const updatedUser = await this.userService.updateUser(
//         req.params.id,
//         req.body
//       );
//       res.status(200).json(updatedUser);
//     } catch (error: any) {
//       if (error.message.includes('not found')) {
//         res.status(404).json({ error: error.message });
//       } else if (error.message.includes('Cannot modify')) {
//         res.status(400).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: 'Internal server error' });
//       }
//     }
//   }

//   async deleteUser(req: Request, res: Response) {
//     try {
//       // Only admins can delete users
//       if (req.user?.role !== UserRole.ADMIN) {
//         return res.status(403).json({ error: 'Only admins can delete users' });
//       }

//       // Prevent self-deletion
//       if (req.params.id === req.user?.id) {
//         return res.status(400).json({ error: 'Cannot delete your own account' });
//       }

//       await this.userService.deleteUser(req.params.id);
//       res.status(204).send();
//     } catch (error: any) {
//       if (error.message.includes('not found')) {
//         res.status(404).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: 'Internal server error' });
//       }
//     }
//   }
// }

//New Code 3
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { UserRole } from '../entity/user';
import { Permission } from '../auth/permissions';

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request, res: Response) {
    try {
      // Only admins can create users (enforced at route level)
      const userData = req.body;
      
      // Prevent role elevation unless admin
      if (userData.role && req.user?.role !== UserRole.ADMIN) {
        return res.status(403).json({ error: 'Only admins can assign roles' });
      }

      // Set default role if not provided
      if (!userData.role) {
        userData.role = UserRole.USER;
      }

      const user = await this.userService.createUser(userData);
      res.status(201).json(user);
    } catch (error: any) {
      if (error.message.includes('already exists')) {
        res.status(409).json({ error: error.message });
      } else if (error.message.includes('required')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      // Admins see all users, others see only themselves (enforced in service)
      const users = await this.userService.getAllUsers(req.user);
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
        const requestedUserId = Number(req.params.id);
        const currentUser = req.user;

        if (!currentUser) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Authentication required'
            });
        }

        // Admins can access any profile
        if (currentUser.role === UserRole.ADMIN) {
            const user = await this.userService.getUserById(requestedUserId);
            return res.status(200).json(user);
        }

        // Regular users can only access their own profile
        if (currentUser.id !== requestedUserId) {
            return res.status(403).json({
                error: 'Forbidden',
                message: `ID mismatch. Your ID: ${currentUser.id}, Requested ID: ${requestedUserId}`
            });
        }

        // Return the requested user
        const user = await this.userService.getUserById(requestedUserId);
        return res.status(200).json(user);

    } catch (error: any) {
        if (error.message.includes('not found')) {
            return res.status(404).json({ error: error.message });
        }
        console.error('getUserById error:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
  }

  // async updateUser(req: Request, res: Response) {
  //   try {
  //     const userId = Number(req.params.id);
      
  //     // Users can only update their own profile unless admin
  //     if (userId !== req.user?.id && req.user?.role !== UserRole.ADMIN) {
  //       return res.status(403).json({ error: 'Unauthorized access' });
  //     }

  //     // Prevent role modification unless admin
  //     if (req.body.role && req.user?.role !== UserRole.ADMIN) {
  //       return res.status(403).json({ error: 'Only admins can modify roles' });
  //     }

  //     const updatedUser = await this.userService.updateUser(
  //       userId,
  //       req.body
  //     );
  //     res.status(200).json(updatedUser);
  //   } catch (error: any) {
  //     if (error.message.includes('not found')) {
  //       res.status(404).json({ error: error.message });
  //     } else if (error.message.includes('Cannot modify')) {
  //       res.status(400).json({ error: error.message });
  //     } else {
  //       res.status(500).json({ error: 'Internal server error' });
  //     }
  //   }
  // }

//   async updateUser(req: Request, res: Response) {
//     try {
//         const userId = Number(req.params.id);
//         const currentUser = req.user;
//         const updates = req.body;

//         if (!currentUser) {
//             return res.status(401).json({ error: 'Authentication required' });
//         }

//         // Remove password from updates if present
//         if (updates.password) {
//             return res.status(403).json({ error: 'Use dedicated password change endpoint' });
//         }

//         const updatedUser = await this.userService.updateUser(
//             userId,
//             updates,
//             currentUser // Pass current user to service
//         );

//         return res.status(200).json(updatedUser);
//     } catch (error: any) {
//         if (error.message.includes('Unauthorized') || error.message.includes('Only admins')) {
//             return res.status(403).json({ error: error.message });
//         }
//         if (error.message.includes('not found')) {
//             return res.status(404).json({ error: error.message });
//         }
//         if (error.message.includes('Cannot modify')) {
//             return res.status(400).json({ error: error.message });
//         }
//         console.error('Update user error:', error);
//         return res.status(500).json({ 
//             error: 'Internal server error',
//             details: process.env.NODE_ENV === 'development' ? error.message : undefined
//         });
//     }
// }

async updateUser(req: Request, res: Response) {
  try {
      const userId = Number(req.params.id);
      const currentUser = req.user;
      const updates = req.body;

      if (!currentUser) {
          return res.status(401).json({ error: 'Authentication required' });
      }

      // Remove password from updates if present
      if (updates.password) {
          return res.status(403).json({ error: 'Use dedicated password change endpoint' });
      }

      const updatedUser = await this.userService.updateUser(
          userId,
          updates,
          currentUser
      );

      return res.status(200).json(updatedUser);
  } catch (error: any) {
      if (error.message.includes('Unauthorized') || error.message.includes('Only admins')) {
          return res.status(403).json({ error: error.message });
      }
      if (error.message.includes('not found')) {
          return res.status(404).json({ error: error.message });
      }
      if (error.message.includes('Cannot modify') || error.message.includes('Use dedicated')) {
          return res.status(400).json({ error: error.message });
      }
      console.error('Update user error:', error);
      return res.status(500).json({ 
          error: 'Internal server error',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
  }
}

async deleteUser(req: Request, res: Response) {
  try {
      const userId = Number(req.params.id);
      const currentUser = req.user;

      if (!currentUser) {
          return res.status(401).json({ error: 'Authentication required' });
      }

      // Pass currentUser to service
      await this.userService.deleteUser(userId, currentUser);
      return res.status(204).send();

  } catch (error: any) {
      console.error('Delete User Error:', error);
      
      if (error.message.includes('Only admins')) {
          return res.status(403).json({ error: error.message });
      }
      if (error.message.includes('Cannot delete')) {
          return res.status(400).json({ error: error.message });
      }
      if (error.message.includes('not found') || error.message.includes('failed')) {
          return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ 
          error: 'Internal server error',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
  }
}
}
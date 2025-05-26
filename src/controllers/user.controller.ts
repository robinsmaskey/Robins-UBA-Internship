// import { Request, Response } from 'express';
// import { UserDetails } from '../interfaces/user.interface';
// import { UserService } from '../services/user.service';

// export class UserController {
//   private userService = new UserService();

//   async createUser(req: Request, res: Response) {
//     try {
//       const user = await this.userService.createUser(req.body);
//       res.status(201).json(user);
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   }

//   async getAllUsers(req: Request, res: Response) {
//     try {
//       const users = await this.userService.getAllUsers();
//       res.status(200).json(users);
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   async getUserById(req: Request, res: Response) {
//     try {
//       const user = await this.userService.getUserById(req.params.id);
//       res.status(200).json(user);
//     } catch (error: any) {
//       res.status(404).json({ error: error.message });
//     }
//   }

//   async updateUser(req: Request, res: Response) {
//     try {
//       const updatedUser = await this.userService.updateUser(req.params.id, req.body);
//       res.status(200).json(updatedUser);
//     } catch (error: any) {
//       const status = error.message === 'User not found' ? 404 : 400;
//       res.status(status).json({ error: error.message });
//     }
//   }

//   async deleteUser(req: Request, res: Response) {
//     try {
//       await this.userService.deleteUser(req.params.id);
//       res.status(204).send();
//     } catch (error: any) {
//       res.status(404).json({ error: error.message });
//     }
//   }

//   async getUsersByCertification(req: Request, res: Response) {
//     try {
//       const certified = req.query.certified === 'true';
//       const users = await this.userService.getUsersByCertification(certified);
//       res.status(200).json(users);
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   }
// }

//New Code
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { UserDetails } from '../interfaces/user.interface';

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request, res: Response) {
    try {
      const userData = req.body;
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
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error: any) {
      if (error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const updatedUser = await this.userService.updateUser(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedUser);
    } catch (error: any) {
      if (error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else if (error.message.includes('Cannot modify')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      await this.userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      if (error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

}
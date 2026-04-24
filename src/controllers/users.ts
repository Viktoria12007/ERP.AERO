import { Request, Response } from 'express';
import * as userService from '../services/users';
import type { Request, Response } from 'express';
import * as userService from '../services/users.js';
import bcrypt from 'bcryptjs';

export const getInfoUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUser(req.body);
    res.json(user.id);
  } catch (err) {
    // if (err.code === 'P2025') {
    //   res.status(404).json({ error: 'User not found' });
    // }
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  await userService.logout(req.body);
  res.json('ok');
}

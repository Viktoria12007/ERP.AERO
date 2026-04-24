import type { Request, Response } from 'express';
import * as userService from '../services/users.js';
import bcrypt from 'bcryptjs';

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await userService.createUser({ id, password: hash });
    res.status(201).json(newUser);
  } catch {
    res.status(500).json({ error: 'fail' });
  }
}

export const loginHandler = async (req: Request, res: Response) => {

}

export const getInfoUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUser();
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

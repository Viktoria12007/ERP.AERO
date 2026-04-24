import type { NextFunction, Request, Response } from 'express';
import * as userService from '../services/users.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { JWT_SECRET, type JwtPayload, REFRESH_SECRET } from "../config";
import UnauthorizedError from "../errors/unauthorized-error";

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await userService.createUser({ id, password: hash });
    res.status(201).json(newUser);
  } catch {
    res.status(500).json({ message: 'Не удалось сохранить пользователя' });
  }
}

export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, password } = req.body;

    const user = await userService.getUser(id);
    if (!user) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }

    const { jwtToken, refreshToken } = sign(res, user.id);

    return res.status(201).json({ jwtToken, refreshToken });
  } catch (err) {
    next(err);
  }
}

export const getNewTokenHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const oldToken = req.cookies.refreshToken;
    if (!oldToken) return res.status(401).json({message: 'Нет refresh токена'});

    let payload: JwtPayload | null = null;
    try {
      payload = jwt.verify(oldToken, REFRESH_SECRET) as JwtPayload;
    } catch {
      return res.status(403).json({ message: 'Недействительный refresh токен' });
    }

    const { jwtToken, refreshToken } = sign(res, payload._id);
    res.status(200).json({ jwtToken, refreshToken });
  } catch (e) {
    next(e);
  }
}

export const sign = (res: Response, userId: string) => {
  const jwtToken = jwt.sign({ _id: userId }, JWT_SECRET,  { expiresIn: '10m' });
  const refreshToken = jwt.sign({ _id: userId }, REFRESH_SECRET, { expiresIn: '7d' });

  res.cookie('jwtToken', jwtToken, {
    maxAge: 600000,
    httpOnly: true,
    sameSite: true,
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return { jwtToken, refreshToken };
}

export const getInfoUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUser(req.user._id);
    res.json(user.id);
  } catch (err) {
    next(err);
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  res.clearCookie('jwtToken', {
    httpOnly: true,
    sameSite: true,
    secure: false,
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: true,
    secure: false,
  });

  res.status(204);
}

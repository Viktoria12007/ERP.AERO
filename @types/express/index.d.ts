import type { Request, Response } from 'express';

declare global{
    namespace Express {
        interface Request {
            user: { _id: string }
        }
    }
}

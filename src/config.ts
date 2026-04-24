export const { JWT_SECRET = 'JWT_SECRET' } = process.env;
export const { REFRESH_SECRET = 'REFRESH_SECRET' } = process.env;
export interface JwtPayload {
  _id: string
}

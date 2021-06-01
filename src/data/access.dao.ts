import { v4 } from 'uuid';
import { redis } from './dao';
import User from './models/user.model';

const prefix = 'access-token-';

export async function createTokenForUser(user: User): Promise<string> {
  const token = v4();
  await redis.set(prefix + token, user.username, 'EX', 1 * 60 * 1000);
  return token;
}

export async function getUsernameFromToken(token: string): Promise<string | null> {
  const username = await redis.get(prefix + token);
  if(!username) {
    return null;
  }
  return username;
}
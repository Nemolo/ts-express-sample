import { v4 } from 'uuid';
import { redis } from './dao';

export async function createAccessToken(username: string, ttl = 60 * 30 * 1000) {
  const token = v4();
  await redis.set('access-' + token, username, 'EX', ttl);
  return token;
}

export async function getAccessToken(token: string) {
  return await redis.get('access-' + token);
}

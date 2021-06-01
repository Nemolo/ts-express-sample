import { redis } from './dao';
import User from './models/user.model';

const prefix = 'user-';

export async function insertUser(user: User): Promise<void> {
  await redis.set(prefix +  user.username, JSON.stringify(user));  
}

export async function getUser(username: string): Promise<User | null> {
  const redisData = await redis.get(prefix +  username);
  if(!redisData) {
    return null;
  }
  const user = JSON.parse(redisData) as User;
  return user;
}
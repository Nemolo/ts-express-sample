import { redis } from './dao';
import { User } from './models/user.model';

export async function getUser(username: string): Promise<User | null> {
  const userString = await redis.get('user-' + username);
  if (!userString) return null;
  return JSON.parse(userString) as User
}

export async function insertUser(user: User): Promise<User> {  
  await redis.set('user-' + user.username, JSON.stringify(user));
  return user;
}
import { promises as fs } from 'fs';
import path from 'path';
const DATA_PATH = path.join(process.cwd(), 'data', 'database.json');
async function readStore() {
  const raw = await fs.readFile(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}
async function writeStore(data: any) {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
}
export async function getUsers() {
  const store = await readStore();
  return store.users as any[];
}
export async function saveUsers(users: any[]) {
  const store = await readStore();
  store.users = users;
  await writeStore(store);
}
export async function getCourses() {
  const store = await readStore();
  return store.courses as any[];
}
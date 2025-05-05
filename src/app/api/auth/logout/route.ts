import { deleteSessionResponse } from '@/app/lib/server/session';

export async function POST() {
  return deleteSessionResponse('/login');
}

import { randomUUID } from 'node:crypto';
import { isAdminAuthenticated } from '@/lib/auth';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated()))
    return Response.json({ error: 'Yetkisiz.' }, { status: 401 });
  const data = await request.json();
  const name = String(data.name ?? '').trim();
  const icon = String(data.icon ?? '').trim();
  const sortOrder = Number(data.sort_order);
  if (
    !name ||
    name.length > 80 ||
    !icon ||
    icon.length > 8 ||
    !Number.isInteger(sortOrder) ||
    sortOrder < 0 ||
    sortOrder > 999
  )
    return Response.json(
      { error: 'Kategori bilgilerini kontrol edin.' },
      { status: 400 },
    );
  const id = randomUUID();
  await query(
    'INSERT INTO categories (id,name,icon,sort_order,active) VALUES ($1,$2,$3,$4,$5)',
    [id, name, icon, sortOrder, data.active !== false],
  );
  return Response.json({ ok: true, id });
}

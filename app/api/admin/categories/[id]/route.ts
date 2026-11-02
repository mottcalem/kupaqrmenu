import { isAdminAuthenticated } from '@/lib/auth';
import { query } from '@/lib/db';

export async function PATCH(
  request: Request,
  context: RouteContext<'/api/admin/categories/[id]'>,
) {
  if (!(await isAdminAuthenticated()))
    return Response.json({ error: 'Yetkisiz.' }, { status: 401 });
  const { id } = await context.params;
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
  const result = await query(
    'UPDATE categories SET name=$1,icon=$2,sort_order=$3,active=$4,updated_at=now() WHERE id=$5 RETURNING id',
    [name, icon, sortOrder, data.active !== false, id],
  );
  if (!result.rowCount)
    return Response.json({ error: 'Kategori bulunamadı.' }, { status: 404 });
  return Response.json({ ok: true });
}

export async function DELETE(
  _: Request,
  context: RouteContext<'/api/admin/categories/[id]'>,
) {
  if (!(await isAdminAuthenticated()))
    return Response.json({ error: 'Yetkisiz.' }, { status: 401 });
  const { id } = await context.params;
  const count = await query<{ count: string }>(
    'SELECT count(*)::text count FROM products WHERE category_id=$1',
    [id],
  );
  if (Number(count.rows[0]?.count))
    return Response.json(
      {
        error:
          'Ürün içeren kategori silinemez. Önce ürünleri başka kategoriye taşıyın.',
      },
      { status: 409 },
    );
  const result = await query(
    'DELETE FROM categories WHERE id=$1 RETURNING id',
    [id],
  );
  if (!result.rowCount)
    return Response.json({ error: 'Kategori bulunamadı.' }, { status: 404 });
  return Response.json({ ok: true });
}

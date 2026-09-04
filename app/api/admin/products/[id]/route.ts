import { isAdminAuthenticated } from '@/lib/auth';
import { query } from '@/lib/db';

export async function PATCH(request: Request, context: RouteContext<'/api/admin/products/[id]'>) {
  if (!(await isAdminAuthenticated())) return Response.json({ error: 'Yetkisiz.' }, { status: 401 });
  const { id } = await context.params; const form = await request.formData();
  const name = String(form.get('name') ?? '').trim(); const categoryId = String(form.get('categoryId') ?? '');
  if (!name || !categoryId) return Response.json({ error: 'Ürün adı ve kategori zorunlu.' }, { status: 400 });
  const image = form.get('image'); let imageBuffer: Buffer | null = null; let imageType: string | null = null; let hasNewImage = false;
  if (image instanceof File && image.size) { if (!image.type.startsWith('image/') || image.size > 3_000_000) return Response.json({ error: 'Görsel en fazla 3 MB olmalı.' }, { status: 400 }); imageBuffer=Buffer.from(await image.arrayBuffer()); imageType=image.type; hasNewImage=true; }
  await query(`UPDATE products SET category_id=$1,name=$2,description=$3,price=$4,popular=$5,active=$6,image_data=CASE WHEN $7 THEN $8 WHEN $9 THEN NULL ELSE image_data END,image_type=CASE WHEN $7 THEN $10 WHEN $9 THEN NULL ELSE image_type END,updated_at=now() WHERE id=$11`, [categoryId,name,String(form.get('description') ?? '').trim() || null,String(form.get('price') ?? '').trim() || null,form.get('popular') === 'true',form.get('active') !== 'false',hasNewImage,imageBuffer,form.get('removeImage') === 'true',imageType,id]);
  return Response.json({ ok: true });
}

export async function DELETE(_: Request, context: RouteContext<'/api/admin/products/[id]'>) {
  if (!(await isAdminAuthenticated())) return Response.json({ error: 'Yetkisiz.' }, { status: 401 });
  const { id } = await context.params; await query('DELETE FROM products WHERE id=$1', [id]);
  return Response.json({ ok: true });
}

import { randomUUID } from 'node:crypto';
import { isAdminAuthenticated } from '@/lib/auth';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return Response.json({ error: 'Yetkisiz.' }, { status: 401 });
  const form = await request.formData();
  const name = String(form.get('name') ?? '').trim();
  const categoryId = String(form.get('categoryId') ?? '');
  if (!name || !categoryId) return Response.json({ error: 'Ürün adı ve kategori zorunlu.' }, { status: 400 });
  const image = form.get('image');
  let imageBuffer: Buffer | null = null; let imageType: string | null = null;
  if (image instanceof File && image.size) {
    if (!image.type.startsWith('image/') || image.size > 3_000_000) return Response.json({ error: 'Görsel en fazla 3 MB olmalı.' }, { status: 400 });
    imageBuffer = Buffer.from(await image.arrayBuffer()); imageType = image.type;
  }
  const id = randomUUID();
  await query(`INSERT INTO products (id,category_id,name,description,price,popular,active,sort_order,image_data,image_type) VALUES ($1,$2,$3,$4,$5,$6,$7,(SELECT COALESCE(MAX(sort_order),-1)+1 FROM products WHERE category_id=$2),$8,$9)`, [id,categoryId,name,String(form.get('description') ?? '').trim() || null,String(form.get('price') ?? '').trim() || null,form.get('popular') === 'true',form.get('active') !== 'false',imageBuffer,imageType]);
  return Response.json({ ok: true, id });
}

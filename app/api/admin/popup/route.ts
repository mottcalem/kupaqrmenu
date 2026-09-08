import { isAdminAuthenticated } from '@/lib/auth';
import { query } from '@/lib/db';

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) return Response.json({ error: 'Yetkisiz.' }, { status: 401 });
  const form = await request.formData();
  const delaySeconds = Number(form.get('delaySeconds'));
  if (!Number.isInteger(delaySeconds) || delaySeconds < 0 || delaySeconds > 300) return Response.json({ error: 'Gösterim süresi 0–300 saniye arasında olmalı.' }, { status: 400 });
  const ctaUrl = String(form.get('ctaUrl') ?? '').trim();
  if (ctaUrl) {
    try { const url = new URL(ctaUrl); if (!['http:', 'https:'].includes(url.protocol)) throw new Error(); }
    catch { return Response.json({ error: 'Buton bağlantısı geçerli bir http/https adresi olmalı.' }, { status: 400 }); }
  }
  const image = form.get('image');
  let imageBuffer: Buffer | null = null; let imageType: string | null = null;
  if (image instanceof File && image.size) {
    if (!image.type.startsWith('image/') || image.size > 5_000_000) return Response.json({ error: 'Görsel en fazla 5 MB olmalı.' }, { status: 400 });
    imageBuffer = Buffer.from(await image.arrayBuffer()); imageType = image.type;
  }
  await query(`UPDATE ad_popup SET enabled=$1,delay_seconds=$2,title=$3,body=$4,cta_label=$5,cta_url=$6,image_data=CASE WHEN $7::boolean THEN NULL WHEN $8::bytea IS NOT NULL THEN $8 ELSE image_data END,image_type=CASE WHEN $7::boolean THEN NULL WHEN $9::text IS NOT NULL THEN $9 ELSE image_type END,updated_at=now() WHERE id=1`, [form.get('enabled') === 'true',delaySeconds,String(form.get('title') ?? '').trim(),String(form.get('body') ?? '').trim(),String(form.get('ctaLabel') ?? '').trim(),ctaUrl,form.get('removeImage') === 'true',imageBuffer,imageType]);
  return Response.json({ ok: true });
}

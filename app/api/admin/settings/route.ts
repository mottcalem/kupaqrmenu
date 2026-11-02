import { isAdminAuthenticated } from '@/lib/auth';
import { query } from '@/lib/db';

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated()))
    return Response.json({ error: 'Yetkisiz.' }, { status: 401 });
  const form = await request.formData();
  const values = [
    'brandName',
    'brandSubtitle',
    'eyebrow',
    'headline',
    'description',
    'venueNote',
  ].map((key) => String(form.get(key) ?? '').trim());
  if (values.some((value) => !value))
    return Response.json(
      { error: 'Tüm metin alanlarını doldurun.' },
      { status: 400 },
    );
  const image = form.get('heroImage');
  let imageBuffer: Buffer | null = null;
  let imageType: string | null = null;
  if (image instanceof File && image.size) {
    if (!image.type.startsWith('image/') || image.size > 5_000_000)
      return Response.json(
        { error: 'Header görseli en fazla 5 MB olmalı.' },
        { status: 400 },
      );
    imageBuffer = Buffer.from(await image.arrayBuffer());
    imageType = image.type;
  }
  await query(
    `UPDATE site_settings SET brand_name=$1,brand_subtitle=$2,eyebrow=$3,headline=$4,description=$5,venue_note=$6,
    hero_image_data=CASE WHEN $7::boolean THEN NULL WHEN $8::bytea IS NOT NULL THEN $8 ELSE hero_image_data END,
    hero_image_type=CASE WHEN $7::boolean THEN NULL WHEN $9::text IS NOT NULL THEN $9 ELSE hero_image_type END,updated_at=now() WHERE id=1`,
    [...values, form.get('removeHeroImage') === 'true', imageBuffer, imageType],
  );
  return Response.json({ ok: true });
}

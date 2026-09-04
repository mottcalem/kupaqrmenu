import { isAdminAuthenticated } from '@/lib/auth';
import { query } from '@/lib/db';

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) return Response.json({ error: 'Yetkisiz.' }, { status: 401 });
  const data = await request.json();
  const values = ['brandName','brandSubtitle','eyebrow','headline','description','venueNote'].map((key) => String(data[key] ?? '').trim());
  if (values.some((value) => !value)) return Response.json({ error: 'Tüm alanları doldurun.' }, { status: 400 });
  await query(`UPDATE site_settings SET brand_name=$1,brand_subtitle=$2,eyebrow=$3,headline=$4,description=$5,venue_note=$6,updated_at=now() WHERE id=1`, values);
  return Response.json({ ok: true });
}

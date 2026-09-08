import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await query<{ image_data: Buffer; image_type: string | null }>('SELECT image_data, image_type FROM ad_popup WHERE id=1 AND image_data IS NOT NULL');
  const image = result.rows[0];
  if (!image) return new Response(null, { status: 404 });
  return new Response(new Uint8Array(image.image_data), { headers: { 'Content-Type': image.image_type ?? 'image/jpeg', 'Cache-Control': 'no-store' } });
}

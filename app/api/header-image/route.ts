import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';
export async function GET() {
  const result = await query<{
    hero_image_data: Buffer;
    hero_image_type: string | null;
  }>(
    'SELECT hero_image_data, hero_image_type FROM site_settings WHERE id=1 AND hero_image_data IS NOT NULL',
  );
  const image = result.rows[0];
  if (!image) return new Response(null, { status: 404 });
  return new Response(new Uint8Array(image.hero_image_data), {
    headers: {
      'Content-Type': image.hero_image_type ?? 'image/jpeg',
      'Cache-Control': 'no-store',
    },
  });
}

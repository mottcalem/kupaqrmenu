import { query } from '@/lib/db';

export async function GET(_: Request, context: RouteContext<'/api/images/[id]'>) {
  const { id } = await context.params;
  const result = await query<{ image_data: Buffer; image_type: string }>('SELECT image_data,image_type FROM products WHERE id=$1 AND image_data IS NOT NULL', [id]);
  if (!result.rows[0]) return new Response(null, { status: 404 });
  return new Response(new Uint8Array(result.rows[0].image_data), { headers: { 'Content-Type': result.rows[0].image_type, 'Cache-Control': 'public, max-age=3600' } });
}

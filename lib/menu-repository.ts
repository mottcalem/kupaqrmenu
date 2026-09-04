import { allMenuItems as fallbackItems, menuCategories as fallbackCategories } from '@/data/menu';
import { hasDatabase, query } from './db';

export type SiteSettings = { brandName: string; brandSubtitle: string; eyebrow: string; headline: string; description: string; venueNote: string };
export type PublicMenuItem = { id: string; categoryId: string; categoryName: string; icon: string; name: string; description?: string; price?: number; popular?: boolean; imageUrl?: string };

export const defaultSettings: SiteSettings = {
  brandName: 'KUPA', brandSubtitle: 'GAME CAFE', eyebrow: 'MOLA VER, LEZZETİ SEÇ', headline: 'Masadaki en iyi hamle.',
  description: 'Kahveden atıştırmalığa, aradığın her şey bir dokunuş uzağında.', venueNote: 'Siparişini garsonumuza iletebilirsin. Afiyet olsun!',
};

export async function getPublicMenu() {
  if (!hasDatabase()) return { categories: fallbackCategories, items: fallbackItems, settings: defaultSettings, databaseConnected: false };
  try {
    const [categoriesResult, productsResult, settingsResult] = await Promise.all([
      query<{ id: string; name: string; icon: string }>('SELECT id, name, icon FROM categories WHERE active = true ORDER BY sort_order, name'),
      query<{ id: string; category_id: string; category_name: string; icon: string; name: string; description: string | null; price: string | null; popular: boolean; has_image: boolean }>(`SELECT p.id, p.category_id, c.name category_name, c.icon, p.name, p.description, p.price, p.popular, (p.image_data IS NOT NULL) has_image FROM products p JOIN categories c ON c.id=p.category_id WHERE p.active=true AND c.active=true ORDER BY c.sort_order, p.sort_order, p.name`),
      query<{ brand_name: string; brand_subtitle: string; eyebrow: string; headline: string; description: string; venue_note: string }>('SELECT brand_name, brand_subtitle, eyebrow, headline, description, venue_note FROM site_settings WHERE id=1'),
    ]);
    const items: PublicMenuItem[] = productsResult.rows.map((row) => ({ id: row.id, categoryId: row.category_id, categoryName: row.category_name, icon: row.icon, name: row.name, description: row.description ?? undefined, price: row.price === null ? undefined : Number(row.price), popular: row.popular, imageUrl: row.has_image ? `/api/images/${row.id}` : undefined }));
    const row = settingsResult.rows[0];
    const settings = row ? { brandName: row.brand_name, brandSubtitle: row.brand_subtitle, eyebrow: row.eyebrow, headline: row.headline, description: row.description, venueNote: row.venue_note } : defaultSettings;
    return { categories: categoriesResult.rows.map((category) => ({ ...category, items: [] })), items, settings, databaseConnected: true };
  } catch (error) {
    console.error('Menü veritabanı okunamadı:', error);
    return { categories: fallbackCategories, items: fallbackItems, settings: defaultSettings, databaseConnected: false };
  }
}

export async function getAdminData() {
  const menu = await getPublicMenu();
  const categories = await query<{ id: string; name: string; icon: string; active: boolean; sort_order: number }>('SELECT id,name,icon,active,sort_order FROM categories ORDER BY sort_order,name');
  const products = await query<{ id: string; category_id: string; name: string; description: string | null; price: string | null; popular: boolean; active: boolean; sort_order: number; has_image: boolean }>('SELECT id,category_id,name,description,price,popular,active,sort_order,(image_data IS NOT NULL) has_image FROM products ORDER BY sort_order,name');
  return { settings: menu.settings, categories: categories.rows, products: products.rows.map((row) => ({ ...row, price: row.price === null ? null : Number(row.price), imageUrl: row.has_image ? `/api/images/${row.id}` : null })) };
}

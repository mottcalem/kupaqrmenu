import { MenuClient } from './menu-client';
import { getPublicMenu } from '@/lib/menu-repository';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const menu = await getPublicMenu();
  return <MenuClient categories={menu.categories} items={menu.items} settings={menu.settings} popup={menu.popup} />;
}

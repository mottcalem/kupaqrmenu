import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import { getAdminData } from '@/lib/menu-repository';
import { AdminDashboard } from './admin-dashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) redirect('/admin/login');
  const data = await getAdminData();
  return <AdminDashboard initialData={data} />;
}

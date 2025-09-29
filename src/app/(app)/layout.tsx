import { AppProvider } from '@/context/app-context';
import { AppSidebar } from '@/components/app-sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProvider>
      <AppSidebar>
        {children}
      </AppSidebar>
    </AppProvider>
  )
}

import { AppProvider } from '@/context/app-context';
import { AppSidebar } from '@/components/app-sidebar';
import { ThemeProvider } from '@/components/theme-provider';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AppProvider>
        <AppSidebar>
          {children}
        </AppSidebar>
      </AppProvider>
    </ThemeProvider>
  )
}

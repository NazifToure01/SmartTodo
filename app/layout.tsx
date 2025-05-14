import './globals.css';
import './rtl.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppProvider } from '@/contexts/AppContext';
import { Header } from '@/components/Header';
import { cn } from '@/lib/utils';
import { ClientI18nProvider } from '@/components/ClientI18nProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BentoTodo - Modern Task Management',
  description: 'A modern todo app with a bento-style UI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={cn(inter.className, 'min-h-screen bg-background')}>
        <ClientI18nProvider>
          <AppProvider>
            <Header />
            <main className="mx-auto">{children}</main>
          </AppProvider>
        </ClientI18nProvider>
      </body>
    </html>
  );
}
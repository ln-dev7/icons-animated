import type { Metadata, Viewport } from 'next';

import './globals.css';

import { Geist, Geist_Mono } from 'next/font/google';
import { CircleXIcon, TriangleAlertIcon } from 'lucide-react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from 'sonner';

import { Analytics } from '@/components/analytics';
import { Header } from '@/components/header';
import { SnowfallComponent } from '@/components/snowfall';
import { ThemeColor } from '@/components/theme-color';
import { IconLibraryProvider } from '@/providers/icon-library';
import { PackageNameProvider } from '@/providers/package-name';
import { ThemeProvider } from '@/providers/theme';
import ogImage from './og.png';

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://icons.lndev.me'),
  openGraph: {
    title: 'icons-animated',
    description: 'meticulously crafted animated icons',
    siteName: 'icons-animated',
    type: 'website',
    locale: 'en_US',
    url: 'https://icons.lndev.me',
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
      },
    ],
  },
  applicationName: 'icons-animated',
  appleWebApp: {
    title: 'icons-animated',
    statusBarStyle: 'default',
    capable: true,
  },
  title: {
    default: 'icons-animated',
    template: `%s - icons-animated`,
  },
  description: 'meticulously crafted animated icons',
  twitter: {
    card: 'summary_large_image',
    title: 'icons-animated',
    description: 'meticulously crafted animated icons',
    creator: '@ln_dev7',
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistMono.variable} ${geist.variable}`}
    >
      <body className={`${geist.className} bg-background relative antialiased`}>
        <div className="root">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NuqsAdapter>
              <IconLibraryProvider>
                <ThemeColor />
                <PackageNameProvider>
                  <Header />
                  {children}
                  <Toaster
                    position="top-center"
                    toastOptions={{
                      classNames: {
                        toast:
                          '!bg-white !px-4 !py-4 !flex-wrap dark:!bg-black !gap-0 !border-neutral-900/5 dark:!border-neutral-100/10 supports-[corner-shape:squircle]:!corner-squircle supports-[corner-shape:squircle]:!rounded-[30px] !rounded-[14px]',
                        title: 'font-sans text-black dark:!text-white',
                        icon: 'translate-y-[-9.5px]',
                        actionButton:
                          '!mt-2 w-full flex items-center justify-center !font-sans !bg-primary focus-visible:outline-primary cursor-pointer !h-8 !text-[14px] transition-colors duration-100 hover:!bg-[color-mix(in_oklab,var(--color-primary),black_10%)] focus-visible:outline-1 focus-visible:outline-offset-1 supports-[corner-shape:squircle]:!corner-squircle supports-[corner-shape:squircle]:!rounded-[30px] !rounded-[14px]',
                        description:
                          'font-sans text-secondary dark:!text-secondary',
                      },
                    }}
                    icons={{
                      error: (
                        <CircleXIcon className="size-4 text-red-600 dark:text-red-400" />
                      ),
                      warning: (
                        <TriangleAlertIcon className="size-4 text-yellow-500 dark:text-yellow-400" />
                      ),
                    }}
                  />
                  <SnowfallComponent />
                  <Analytics />
                </PackageNameProvider>
              </IconLibraryProvider>
            </NuqsAdapter>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}

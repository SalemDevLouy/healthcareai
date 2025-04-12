import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner';
import NavBar from "../components/NavBar";
import Providers from "./providers";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import Provider from "@/components/ProviderSession";

export const metadata: Metadata = {
  title: "Car Trucker",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='bg-gray-200 dark:bg-sky-950'>
        <Toaster/>
        <Provider>
           <AppRouterCacheProvider>
          <Providers>
            <ThemeProvider theme={theme}>
                <NavBar />
                {children}
            </ThemeProvider>
          </Providers>
        </AppRouterCacheProvider>
        </Provider>
       
      </body>
    </html>
  );
}

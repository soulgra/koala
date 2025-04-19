import { Toaster } from "@/components/ui/toaster";
import "@/globals.css";
import { ThemeProvider } from "@/providers/theme";
import type { Metadata } from "next";
import { TanstackReactQueryProvider } from "@/providers/tanstack-react-query";
import { AuthWrapper } from "@/components/auth-wrapper";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Koala",
  description: "A chat bot to automate your Solana work flows",
  icons: {
    icon: "/assets/images/koala.png",
    apple: "/assets/images/koala.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/images/koala.png" sizes="any" />
        <link rel="apple-touch-icon" href="/assets/images/koala.png" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TanstackReactQueryProvider>
            <AuthWrapper>
              <TooltipProvider>{children}</TooltipProvider>
            </AuthWrapper>
          </TanstackReactQueryProvider>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

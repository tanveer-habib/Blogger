import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { AppContextProvider } from "@/context/AppContext.js";
import WelcomeBanner from "@/components/WelcomeBanner";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700", "900"]
});

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en" className={`${roboto.className} h-full antialiased`} >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <ThemeProvider attribute="class">
          <AppContextProvider>
            <Toaster />
            <WelcomeBanner />
            {children}
          </AppContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

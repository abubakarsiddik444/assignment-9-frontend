import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/providers/AuthProvider";
import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "PetAdopt — Find Your Furry Friend",
    template: "%s | PetAdopt",
  },
  description:
    "A full-stack pet adoption platform to browse pets, view detailed profiles, submit adoption requests and manage listings.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-slate-900 dark:bg-[#0f1117] dark:text-slate-100">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: "12px",
                background: "#0f172a",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 600,
              },
              success: { iconTheme: { primary: "#0d9488", secondary: "#ffffff" } },
              error: { iconTheme: { primary: "#e11d48", secondary: "#ffffff" } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}

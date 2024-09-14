import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
const poppins = Roboto({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "700"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <main className={`${poppins.className}`}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}

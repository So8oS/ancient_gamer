import Footer from "@/footer";
import Navbar from "@/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col justify-center items-center p-3 text-gray-100 bg-[url('/wp.jpg')] min-h-screen ">
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

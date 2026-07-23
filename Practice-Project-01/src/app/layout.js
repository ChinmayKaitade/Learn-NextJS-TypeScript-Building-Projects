import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Travel Guide Project",
  description:
    "This is Practice Project 01 - Travel Guidance website in NextJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} w-screen h-screen bg-black`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

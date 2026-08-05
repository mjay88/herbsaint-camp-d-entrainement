import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css"
const inter = Inter({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html className={cn("font-sans", inter.variable)}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

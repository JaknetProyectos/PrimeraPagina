import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Adventure Trip - Visita México",
  description: "En Adventure Trip creemos que viajar es mucho más que moverse de un lugar a otro: es vivir experiencias que despiertan los sentidos, conectan con la cultura y dejan recuerdos inolvidables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/react-grab/dist/index.global.js"
        />
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased font-work-sans">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}

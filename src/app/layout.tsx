import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import { CLINICA, SITE_URL } from "@/data/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const GTM_ID = "GTM-M9GM99DS";

const TITULO = "Implantes Dentários em Camboriú, SC | Concept";
const DESCRICAO =
  "Implantes dentários, prótese protocolo, facetas e harmonização orofacial em Camboriú, SC. Odontologia humanizada, acolhedora e sem julgamentos. Agende sua consulta.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITULO,
    template: "%s | Concept Implantes Dentários",
  },
  description: DESCRICAO,
  applicationName: CLINICA.nome,
  keywords: [
    "implante dentário Camboriú",
    "implantes dentários",
    "prótese protocolo",
    "dentista Camboriú",
    "facetas dentárias",
    "lentes de contato dental",
    "harmonização orofacial",
    "Balneário Camboriú",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: CLINICA.nome,
    title: TITULO,
    description: DESCRICAO,
    images: [
      {
        url: "/og/concept.jpg",
        width: 1200,
        height: 630,
        alt: "Concept Implantes Dentários, implantes dentários em Camboriú, SC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRICAO,
    images: ["/og/concept.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
  category: "health",
};

export const viewport: Viewport = {
  themeColor: "#101010",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} h-full antialiased`}
    >
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <StructuredData />
      </body>
    </html>
  );
}

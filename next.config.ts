import type { NextConfig } from "next";

/**
 * Cabeçalhos de segurança em todas as respostas. A CSP é deliberadamente
 * moderada: bloqueia o site de ser embutido em outras páginas (clickjacking),
 * plugins, troca da <base> e envio de formulários para fora, sem restringir
 * scripts. Uma CSP de scripts quebraria as tags que o GTM injeta.
 */
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Fotos e vídeos: 1 dia de cache no navegador e mais 7 servindo a cópia
      // antiga enquanto busca a nova (troca de arquivo aparece no dia seguinte).
      {
        source: "/:dir(hero|casos|marca|videos|og)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;

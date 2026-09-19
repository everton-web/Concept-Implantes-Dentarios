import { SITE_URL } from "@/data/site";

/**
 * Recebe o lead do formulário e repassa para o Apps Script da planilha.
 * Passar pelo servidor permite barrar bots antes de gravar qualquer linha:
 * origem, user-agent, campo-isca (honeypot), tempo mínimo de preenchimento,
 * validação dos dados e limite de envios por IP.
 */

const LEADS_WEBHOOK =
  process.env.LEADS_WEBHOOK_URL ??
  "https://script.google.com/macros/s/AKfycbzcpDfqd7qVBDoWt8aXo3U_p9901OinKlAKfIvuO0hLAO-ghVeTDfYFb5OidKinoFJm/exec";

/** Menos que isso entre abrir o formulário e enviar: só um robô preenche. */
const TEMPO_MINIMO_MS = 2500;

/**
 * Limite por IP, contra rajadas automáticas. Folgado de propósito: a equipe
 * testando do mesmo Wi-Fi ou várias pessoas numa mesma rede (clínica,
 * empresa, 4G com IP compartilhado) não chegam perto. Robôs de verdade já
 * caem antes, no campo-isca e no tempo mínimo.
 */
const JANELA_MS = 10 * 60 * 1000;
const MAX_ENVIOS = 30;
const envios = new Map<string, number[]>();

const UA_SUSPEITO =
  /curl|wget|python|httpie|axios|node-fetch|go-http|java\/|okhttp|scrapy|libwww|headless|phantom|puppeteer|playwright|selenium/i;

function passouDoLimite(ip: string) {
  const agora = Date.now();
  const recentes = (envios.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  recentes.push(agora);
  envios.set(ip, recentes);
  // Limpeza simples para o mapa não crescer sem fim.
  if (envios.size > 5000) envios.clear();
  return recentes.length > MAX_ENVIOS;
}

function origemPermitida(request: Request) {
  const origem = request.headers.get("origin");
  if (!origem) return false;
  const host = request.headers.get("host");
  try {
    const url = new URL(origem);
    return (
      url.host === host ||
      url.origin === SITE_URL ||
      url.hostname === "localhost" ||
      url.hostname.endsWith(".vercel.app")
    );
  } catch {
    return false;
  }
}

// Resposta neutra para bots: parece sucesso, mas nada é gravado.
const ok = () => Response.json({ ok: true });
const erro = (status: number, mensagem: string) =>
  Response.json({ ok: false, erro: mensagem }, { status });

export async function POST(request: Request) {
  if (!origemPermitida(request)) return erro(403, "origem");

  const ua = request.headers.get("user-agent") ?? "";
  if (!ua || UA_SUSPEITO.test(ua)) return ok();

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "desconhecido";
  if (passouDoLimite(ip)) return erro(429, "limite");

  let dados: Record<string, unknown>;
  try {
    dados = await request.json();
  } catch {
    return erro(400, "formato");
  }

  const nome = typeof dados.nome === "string" ? dados.nome.trim() : "";
  const telefone = typeof dados.telefone === "string" ? dados.telefone.trim() : "";
  const isca = typeof dados.empresa === "string" ? dados.empresa : "";
  const inicio = typeof dados.inicio === "number" ? dados.inicio : 0;

  // Campo-isca preenchido ou envio instantâneo: robô.
  if (isca || !inicio || Date.now() - inicio < TEMPO_MINIMO_MS) return ok();

  const digitos = telefone.replace(/\D/g, "");
  if (
    nome.length < 2 ||
    nome.length > 121 ||
    /https?:|www\.|<|>/i.test(nome) ||
    digitos.length < 10 ||
    digitos.length > 11
  ) {
    return erro(422, "dados");
  }

  // Uma única tentativa. O Apps Script grava ao receber o POST e só depois
  // redireciona; erro ou demora na resposta NÃO significa que não gravou.
  // Por isso a rota nunca pede nova tentativa ao navegador (evita linhas
  // duplicadas); falhas ficam só no log do servidor.
  try {
    const resposta = await fetch(LEADS_WEBHOOK, {
      method: "POST",
      body: new URLSearchParams({ Nome: nome, Telefone: telefone }),
      redirect: "manual",
      signal: AbortSignal.timeout(15000),
    });
    if (resposta.status >= 400) {
      console.error("[lead] Apps Script respondeu", resposta.status);
    }
  } catch (e) {
    console.error("[lead] falha ao falar com o Apps Script", e);
  }

  return ok();
}

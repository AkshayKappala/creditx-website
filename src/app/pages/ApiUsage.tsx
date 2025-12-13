import { useCallback, useRef, useState } from "react";
import { motion } from "motion/react";
import { LuCircleCheck, LuCopy } from "react-icons/lu";
import { Button } from "../components/ui/button";

type ApiEndpoint = {
  title: string;
  service: string;
  baseUrl: string;
  method: "POST";
  path: string;
  description: string;
  requestSchema: string[];
  responseSchema: string[];
  curl: string;
};

const endpoints: ApiEndpoint[] = [
  {
    title: "Create transaction",
    service: "creditMainServ",
    baseUrl: "http://localhost:8080",
    method: "POST",
    path: "/api/transactions",
    description: "Creates an inbound transaction and returns an initial status.",
    requestSchema: [
      "issuerAccountId: number",
      "merchantAccountId: number",
      "amount: number",
      "currency?: string (default: USD)",
    ],
    responseSchema: ["transactionId: number", "status: PENDING | AUTHORIZED | SUCCESS | FAILED"],
    curl: `curl -X POST http://localhost:8080/api/transactions \\\n  -H "Content-Type: application/json" \\\n  -d '{"issuerAccountId":1001,"merchantAccountId":2001,"amount":1500.00,"currency":"USD"}'`,
  },
  {
    title: "Commit transaction",
    service: "creditMainServ",
    baseUrl: "http://localhost:8080",
    method: "POST",
    path: "/api/transactions/{id}/commit",
    description: "Commits a previously authorized transaction using the hold identifier.",
    requestSchema: ["holdId: number"],
    responseSchema: ["transactionId: number", "status: PENDING | AUTHORIZED | SUCCESS | FAILED", "message: string"],
    curl: `curl -X POST http://localhost:8080/api/transactions/123/commit \\\n  -H "Content-Type: application/json" \\\n  -d '{"holdId":456}'`,
  },
  {
    title: "Create cashback transaction",
    service: "creditMainServ",
    baseUrl: "http://localhost:8080",
    method: "POST",
    path: "/api/transactions/cashback",
    description: "Creates a cashback credit transaction for an eligible posted purchase.",
    requestSchema: [
      "issuerAccountId: number",
      "merchantAccountId: number",
      "amount: number",
      "currency?: string (default: USD)",
    ],
    responseSchema: ["transactionId: number", "status: PENDING | AUTHORIZED | SUCCESS | FAILED"],
    curl: `curl -X POST http://localhost:8080/api/transactions/cashback \\\n  -H "Content-Type: application/json" \\\n  -d '{"issuerAccountId":1001,"merchantAccountId":9999,"amount":25.00,"currency":"USD"}'`,
  },
  {
    title: "Create hold (authorization)",
    service: "creditHoldServ",
    baseUrl: "http://localhost:8081",
    method: "POST",
    path: "/api/holds",
    description: "Creates an authorization hold after risk checks and balance validation.",
    requestSchema: [
      "transactionId: number",
      "issuerAccountId: number",
      "merchantAccountId: number",
      "amount: number",
      "currency?: string (default: USD)",
    ],
    responseSchema: ["holdId: number", "status: AUTHORIZED | CAPTURED | VOIDED | EXPIRED"],
    curl: `curl -X POST http://localhost:8081/api/holds \\\n  -H "Content-Type: application/json" \\\n  -d '{"transactionId":123,"issuerAccountId":1001,"merchantAccountId":2001,"amount":1500.00,"currency":"USD"}'`,
  },
];

function CodeBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  const copy = useCallback(async () => {
    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      resetTimerRef.current = window.setTimeout(() => setCopied(false), 1200);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    setCopied(true);
    resetTimerRef.current = window.setTimeout(() => setCopied(false), 1200);
  }, [text]);

  return (
    <div className="rounded-2xl bg-slate-950/80 p-6 border border-white/5 font-mono text-sm overflow-x-auto">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-8 px-3 bg-white/5 hover:bg-white/10 text-white border-white/20 rounded-full"
          onClick={copy}
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <LuCircleCheck className="w-4 h-4 mr-2" />
              Copied
            </>
          ) : (
            <>
              <LuCopy className="w-4 h-4 mr-2" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre className="text-gray-300 whitespace-pre">{text}</pre>
    </div>
  );
}

export function ApiUsage() {
  return (
    <section id="api-usage" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            API Usage
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            API specification and example cURL requests for the CreditX services.
          </p>
        </motion.div>

        <div className="space-y-8">
          {endpoints.map((ep, index) => (
            <motion.div
              key={ep.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl text-white mb-2">{ep.title}</h2>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 font-mono">
                      {ep.service}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/15 to-purple-500/15 border border-white/10 text-xs text-cyan-300 font-mono">
                      {ep.method} {ep.path}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 mb-6">{ep.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-white mb-3">Request</div>
                  <ul className="space-y-2 text-sm text-gray-300 font-mono">
                    {ep.requestSchema.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-white mb-3">Response</div>
                  <ul className="space-y-2 text-sm text-gray-300 font-mono">
                    {ep.responseSchema.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <CodeBlock text={ep.curl} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

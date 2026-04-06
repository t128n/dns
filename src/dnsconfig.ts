import { REG_PORKBUN, DSP_CF } from "~/lib/providers";
import { protonMail } from "~/lib/common";

// oxfmt-ignore
D("t128n.dev", REG_PORKBUN, DnsProvider(DSP_CF), DefaultTTL(300),
  ALIAS("@", "t128n-dev.pages.dev.", CF_PROXY_ON),
  CNAME("www", "@"),

  ...protonMail({
    subdomain: "@",
    verification: "82b6e14e24e883e32af968aedff32813d40cf559",
    dkim: [
      { hostname: "protonmail._domainkey", value: "protonmail.domainkey.dr7jszazunhohfbslstb5cumoxsz7fa7ahr3o67k2gt4sml3nd2ja.domains.proton.ch." },
      { hostname: "protonmail2._domainkey", value: "protonmail2.domainkey.dr7jszazunhohfbslstb5cumoxsz7fa7ahr3o67k2gt4sml3nd2ja.domains.proton.ch." },
      { hostname: "protonmail3._domainkey", value: "protonmail3.domainkey.dr7jszazunhohfbslstb5cumoxsz7fa7ahr3o67k2gt4sml3nd2ja.domains.proton.ch." },
    ],
    dmarc: { name: "_dmarc", policy: "p=quarantine" },
  }),
);

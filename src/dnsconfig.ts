import { REG_PORKBUN, DSP_CF } from "~/lib/providers";
import { protonMail } from "~/lib/common";

// oxfmt-ignore
D("t128n.dev", REG_PORKBUN, DnsProvider(DSP_CF), DefaultTTL(300),
  CNAME("www", "@"),

  ...protonMail({
    subdomain: "@",
    verification: "protonmail-verification=82b6e14e24e883e32af968aedff32813d40cf559",
    dkim: [{ selector: "protonmail", publicKey: "publickey" }],
    dmarc: { name: "_dmarc", policy: "p=quarantine" },
  }),
);

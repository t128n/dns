export function googleWorkspaceMx(subdomain: string) {
  return [
    MX(subdomain, 1, "aspmx.l.google.com."),
    MX(subdomain, 5, "alt1.aspmx.l.google.com."),
    MX(subdomain, 5, "alt2.aspmx.l.google.com."),
    MX(subdomain, 10, "alt3.aspmx.l.google.com."),
    MX(subdomain, 10, "alt4.aspmx.l.google.com."),
  ];
}

export function protonMailMx(subdomain: string) {
  return [MX(subdomain, 10, "mail.protonmail.ch."), MX(subdomain, 20, "mailsec.protonmail.ch.")];
}

export function protonMailSpf(subdomain: string) {
  return TXT(subdomain, "v=spf1 include:_spf.protonmail.ch mx ~all");
}

export interface ProtonMailConfig {
  subdomain: string;
  verification: string;
  dkim: Array<{
    selector: string;
    publicKey: string;
  }>;
  dmarc?: {
    name?: string;
    policy?: "p=none" | "p=quarantine" | "p=reject" | string;
    subdomainPolicy?: "p=none" | "p=quarantine" | "p=reject" | string;
  };
}

export function protonMailDkim(records: ProtonMailConfig["dkim"]) {
  return records.map(({ selector, publicKey }) => TXT(`${selector}._domainkey`, `v=DKIM1; k=rsa; p=${publicKey}`));
}

export function protonMailDmarc(name: string, policy = "p=quarantine") {
  return TXT(name, `v=DMARC1; ${policy}`);
}

export function protonMailVerificationTxt(token: string) {
  return TXT("@", `protonmail-verification=${token}`);
}

export function protonMail({ subdomain, verification, dkim, dmarc }: ProtonMailConfig) {
  return [
    ...protonMailMx(subdomain),
    protonMailVerificationTxt(verification),
    protonMailSpf(subdomain),
    ...protonMailDkim(dkim),
    protonMailDmarc(dmarc?.name ?? "_dmarc", dmarc?.policy ?? "p=quarantine"),
  ];
}

export interface Alternative {
  name: string;
  url: string;
  description: string;
  pros: string[];
  cons: string[];
  isBestBet?: boolean;
  bestBetReason?: string;
}

export const alternatives: Alternative[] = [
  {
    name: "Stoat",
    url: "https://stoat.chat",
    description:
      "Open-source Discord clone (formerly Revolt), built in Rust for speed and lightness.",
    pros: [
      "High privacy protection — no ads/trackers, GDPR-compliant, Europe-based",
      "No ID checking required",
      "Self-hostable for full decentralization and data control",
      "Transparent open-source TOS and code",
      "Minimal data collection",
      "Channels, permissions, bots, upcoming video/screen sharing",
    ],
    cons: [
      "Still in active development (some features like full E2EE/video pending)",
      "Smaller user base",
      "Main instance may have load issues during surges",
    ],
    isBestBet: true,
    bestBetReason:
      "Open-source and self-hostable Discord-style experience; privacy-focused; no central control if self-hosted; transparent code/TOS.",
  },
  {
    name: "Root",
    url: "https://rootapp.com",
    description:
      "Next-gen community platform with chat plus task management and coordination tools; supports importing Discord servers.",
    pros: [
      "No mandatory ID verification",
      "Strong privacy focus — user-controlled data in community apps",
      "Centralized but customizable TOS",
      "Low data collection (no selling/sharing emphasized)",
      "Modern features like tasks, raid planning, stickers",
    ],
    cons: [
      "Centralized (no self-hosting mentioned)",
      "Relatively new — may have bugs/polish needed",
      "Smaller community",
      "Not fully open-source",
    ],
  },
  {
    name: "Valour",
    url: "https://valour.gg",
    description:
      "Open-source, community-first chat client with multi-window support and economy rewards.",
    pros: [
      "Privacy-first — never sells data, transparent open-source code",
      "No heavy ID checking",
      "Community-driven with customizable themes",
      "Low data collection",
      "Multi-window channels for power users",
    ],
    cons: [
      "Alpha stage — buggy/in development",
      "Centralized hosting (no self-hosting)",
      "Lacks full voice/screen sharing",
      "Smaller ecosystem",
    ],
  },
  {
    name: "Matrix",
    url: "https://matrix.org",
    description:
      "Federated open-source protocol for decentralized chat. Clients include Element, Cinny, and Commet.",
    pros: [
      "End-to-end encryption for top security",
      "No ID checking — pick any homeserver",
      "Fully decentralized/federated — no single control point",
      "Transparent/open TOS per homeserver",
      "User-controlled data & minimal collection on self-hosted instances",
    ],
    cons: [
      "Default UI (Element) slower/less Discord-like",
      "Federation can introduce complexity",
      "Some homeservers vary in privacy policies",
    ],
    isBestBet: true,
    bestBetReason:
      "Fully federated/open-source protocol; E2EE security; no ID checks; anyone hosts servers; minimal data collection on self-hosts.",
  },
  {
    name: "TeamSpeak",
    url: "https://www.teamspeak.com",
    description:
      "Proven VoIP platform with text and voice channels, trusted for over two decades.",
    pros: [
      "Strong security on self-hosted servers",
      "No global ID checking — server-dependent",
      "Decentralized via self-hosting",
      "Customizable TOS on private servers",
      "Low data collection if self-hosted",
    ],
    cons: [
      "Dated UI",
      "Limited modern text features",
      "Centralization on official servers",
      "No native screen sharing",
    ],
    isBestBet: true,
    bestBetReason:
      "Self-hostable high-quality voice servers; secure and customizable; low central oversight on private setups.",
  },
];

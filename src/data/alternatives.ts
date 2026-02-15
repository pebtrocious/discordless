// discordFeatures logic (as of February 13, 2026):
// - true:  Feature is confirmed available and usable now (on official/main instances or generally).
// - false: Feature is in development / planned / implemented but not launched yet (e.g., code exists but not enabled, servers not ready, or explicitly upcoming/wishlist).
// - undefined / not listed: Feature is explicitly not available at all, no evidence of implementation or plans, or not applicable to the platform (e.g., no server-based custom roles in pure messengers).

export interface Alternative {
	name: string;
	url: string;
	description: string;
	pros: string[];
	cons: string[];
	discordFeatures?: {
		textChannel?: boolean;
		voiceChannel?: boolean;
		videoChannel?: boolean;
		screenSharing?: boolean;
		customEmojis?: boolean;
		customRoles?: boolean;
		permissions?: boolean;
	};
	faviconUrl?: string;
	popularity?: 'popular' | 'less';
	mobileSupport?: 'yes' | 'no' | 'partial' | 'unknown';
	mobileNote?: string;
	nsfwPolicy?: 'allowed' | 'forbidden' | 'mixed' | 'unknown';
	nsfwNote?: string;
	originFlag?: string;
	originLabel?: string;
	originNote?: string;
	warnings?: string[];
	isBestBet?: boolean;
	bestBetReason?: string;
}

export const alternatives: Alternative[] = [
	{
		name: 'Discourse',
		url: 'https://github.com/discourse/discourse',
		description:
			'Popular open-source forum software that includes both traditional threads and real-time text chat.  It is used by over 22,000 communities, including many massive ones that contain multiple millions of users each.',
		discordFeatures: {
			textChannel: true,
			voiceChannel: true,
			customEmojis: true,
			customRoles: true,
			permissions: true,
		},
		pros: [
			'Forum threads are updated in real-time, including typing notifications and displaying new posts -- no window refresh required',
			'Also includes real-time text chat rooms similar to Discord chat rooms',
			'Self-hostable for full decentralization and data control',
			'Completely customizable themes',
			'Responsive UI works on mobile and desktop',
			'Many free integration plugins, including Mumble for voice chat, Patreon for backer reward tiers and Wordpress for blog comments',
			'Premium plugins (SSO, Voting, etc) are included free if self-hosted',
			'Detailed role-based access',
			'Robust moderation tooling for community management',
		],
		cons: [
			'Not logged in guests may not realize there are real-time text chatrooms as they are hidden to guests',
			'Configuration must be carefully reviewed to ensure it is as desired, since the default settings deters rapid posting or short threads',
			'Voice chat is not natively provided, but through a community plugin that connects to Mumble',
			'If not self-hosting, paid hosting plans are expensive to access premium plugins ($20-$500)',
			'Can take a while to load on older mobile phone browsers',
			'Requires a large amount of server ram (2~4 GB)',
		],
		popularity: 'popular',
		mobileSupport: 'yes',
		mobileNote:
			'There is a mobile app, but the software is typically used in a web browser by most users.',
		nsfwPolicy: 'allowed',
		nsfwNote:
			"Self-hosted can be used however your hosting provider permits.  For officially hosted instances, consult Discourse's policies, though they appear to allow it.",
		faviconUrl: 'https://discourse.org/favicon.ico',
		originFlag: '🇺🇸',
		originLabel: 'US',
		originNote:
			'Project is US-based, but self-hosted instances can be anywhere with their own policies.',
		warnings: [],
		isBestBet: true,
		bestBetReason:
			'A forums experience that is open-source, self-hostable, and modern; it brings the real-time interactivity that Discord users expect to the forums paradigm.',
	},
	{
		name: 'Stoat',
		url: 'https://stoat.chat',
		description:
			'Open-source Discord clone (formerly Revolt, rebranded late 2025), built in Rust for speed and lightness. Surging in interest in 2026 due to Discord policy changes; focuses on privacy and familiar server structure.',
		discordFeatures: {
			textChannel: true,
			voiceChannel: true,
			videoChannel: false,
			screenSharing: false,
			customEmojis: true,
			customRoles: true,
			permissions: true,
		},
		pros: [
			'High privacy protection — no ads/trackers, GDPR-compliant, Europe-based',
			'No ID checking required',
			'Self-hostable for full decentralization and data control',
			'Transparent open-source TOS and code',
			'Minimal data collection',
			'Channels, permissions, bots, voice channels live; video/screen upcoming',
		],
		cons: [
			'Video and screen sharing still preparing for launch (resource-intensive)',
			'Smaller user base (though rapidly growing in 2026)',
			'Main instance may have load issues during surges',
		],
		popularity: 'popular',
		mobileSupport: 'partial',
		mobileNote:
			'Official Stoat client has desktop and web; mobile support depends on community clients and may lag behind.',
		nsfwPolicy: 'mixed',
		nsfwNote:
			'NSFW policy depends on the specific instance/server; check rules for the instance you join.',
		faviconUrl: 'https://stoat.chat/favicon.svg',
		originFlag: '🇪🇺',
		originLabel: 'EU',
		originNote:
			'Project is Europe-based, but self-hosted instances can be anywhere with their own policies.',
		warnings: [
			"Limited federation: self-hosted instances don't connect seamlessly to official one.",
			'Video/screen sharing needs significant server scaling.',
			'App store clients have hardcoded backends → self-hosting requires forking/recompiling mobile apps to change server domains.',
		],
		isBestBet: false,
		bestBetReason:
			'Open-source and self-hostable Discord-style experience; privacy-focused; no central control if self-hosted; transparent code/TOS.',
	},
	{
		name: 'Root',
		url: 'https://rootapp.com',
		description:
			'Next-gen community platform with chat plus task management and coordination tools; supports importing Discord servers; very similar UI/feel to Discord.',
		discordFeatures: {
			textChannel: true,
			voiceChannel: true,
			videoChannel: true,
			screenSharing: true,
			customEmojis: true,
			customRoles: true,
			permissions: true,
		},
		pros: [
			'No mandatory ID verification',
			'Strong privacy focus — user-controlled data in community apps',
			'Centralized but customizable TOS',
			'Low data collection (no selling/sharing emphasized)',
			'Modern features like tasks, raid planning, stickers, custom apps',
		],
		cons: [
			'Centralized (no self-hosting mentioned)',
			'Relatively new — may have bugs/polish needed',
			'Smaller community',
			'Not fully open-source',
		],
		popularity: 'popular',
		mobileSupport: 'yes',
		mobileNote:
			'Offers mobile apps; feature coverage may differ slightly from desktop/web.',
		nsfwPolicy: 'forbidden',
		nsfwNote:
			'NSFW content is generally not allowed under the platform terms; check latest TOS to confirm.',
		faviconUrl:
			'https://cdn.prod.website-files.com/6792bf217e6993766175e274/6792bf217e6993766175e44d_Group%201171274974%201%20(2).png',
		originFlag: '🇺🇸',
		originLabel: 'US',
		originNote:
			'Company is US-based, so data and legal obligations typically follow US jurisdiction.',
		warnings: [
			'Centralized platforms can alter policies over time despite current privacy promises.',
		],
	},
	{
  name: 'Valour',
  url: 'https://valour.gg',
  description:
    'Open-source, privacy-focused community chat app (client + server). You can try the Valour Alpha at app.valour.gg.',
  discordFeatures: {
    textChannel: true,
    voiceChannel: true,
    customEmojis: true,
    customRoles: true,
    permissions: true,
    videoChannel: true,
  },
  pros: [
    'Open-source client + server (AGPL)',
    'Try the hosted Alpha instantly at app.valour.gg',
    'Privacy policy explicitly states minimal collection and no ads/marketing emails',
    'No third-party analytics like Google Analytics',
    'Active development with frequent releases',
  ],
  cons: [
    'Still Alpha: expect bugs, breaking changes, and missing polish',
    'Self-hosting is possible but not “one-click”: requires running a server stack (Postgres + Redis + appsettings, etc.)',
    'Some functionality relies on third parties (e.g., email delivery, optional error reporting, payments, push notifications, GIF search)',
    'Smaller ecosystem/userbase than Discord (bots, integrations, community momentum)',
  ],
  popularity: 'popular',
  mobileSupport: 'partial',
  mobileNote:
			'Mobile support is in progress; expect rough edges and missing features compared to desktop.',
  nsfwPolicy: 'mixed',
  nsfwNote:
    'NSFW tolerance depends on individual communities and admins; always read the specific server rules.',
  faviconUrl: 'https://valour.gg/favicon.ico',
  originFlag: '',
  originLabel: 'US',
  originNote:
    'Operated by Valour Software LLC; privacy policy states servers/providers are US-based and data may be processed in the US.',
  warnings: [
    'Privacy policy notes DOB is collected for 13+ age verification and IP is logged for security/media uploads.',
    'Third parties listed include SendGrid (transactional email), Sentry (opt-in), PayPal (payments), Firebase (push on Android), Tenor (GIF search).',
  ],
	},
	{
		name: 'Matrix',
		url: 'https://matrix.org',
		description:
			'Federated open-source protocol for decentralized chat. Clients include Element (most feature-complete), Commet (more Discord-like UI), Cinny, and others. Experience varies significantly by client.',
		discordFeatures: {
			textChannel: true,
			voiceChannel: true,
			videoChannel: true,
			screenSharing: true,
			customEmojis: true,
			customRoles: false,
			permissions: true,
		},
		pros: [
			'End-to-end encryption for top security',
			'No ID checking — pick any homeserver',
			'Fully decentralized/federated — no single control point',
			'Transparent/open TOS per homeserver',
			'User-controlled data & minimal collection on self-hosted instances',
		],
		cons: [
			'Default UI (Element) slower/less Discord-like',
			'Federation can introduce complexity',
			'Some homeservers vary in privacy policies',
		],
		popularity: 'popular',
		mobileSupport: 'yes',
		mobileNote:
			'Matrix has multiple mobile clients; some are more mature than others, so UX can vary a lot.',
		nsfwPolicy: 'mixed',
		nsfwNote:
			'NSFW rules depend entirely on the homeserver/community; some allow it with tagging, others forbid it.',
		faviconUrl: 'https://matrix.org/images/matrix-favicon.svg',
		originFlag: '🌍',
		originLabel: 'Global / decentralized',
		originNote:
			'Matrix is a protocol run by many independent homeservers, so "origin" matters less than the server you pick.',
		warnings: [
			'E2EE hides content, but homeservers see metadata (who/when).',
			'Client-dependent experience: Element most complete (but UI differs from Discord, screenshare lacks audio); Commet more Discord-like (single maintainer, worse screenshare framerates/no audio).',
		],
		isBestBet: true,
		bestBetReason:
			'Fully federated/open-source protocol; E2EE security; no ID checks; anyone hosts servers; minimal data collection on self-hosts.',
	},
	{
		name: 'TeamSpeak',
		url: 'https://www.teamspeak.com',
		description:
			'Proven VoIP platform with text and voice channels, trusted for over two decades.',
		discordFeatures: {
			textChannel: true,
			voiceChannel: true,
			videoChannel: true,
			screenSharing: true,
			customEmojis: false,
			customRoles: true,
			permissions: true,
		},
		pros: [
			'Strong security on self-hosted servers',
			'No global ID checking — server-dependent',
			'Decentralized via self-hosting',
			'Customizable TOS on private servers',
			'Low data collection if self-hosted',
			'Supports modern features like screen sharing on newer clients',
		],
		cons: [
			'Dated UI',
			'Limited modern text features',
			'Centralization on official servers',
			'File and image handling feels clunky compared to modern chat apps',
		],
		popularity: 'popular',
		mobileSupport: 'yes',
		mobileNote:
			'Has official mobile apps; feature set is focused on voice and basic text rather than rich media.',
		nsfwPolicy: 'mixed',
		nsfwNote:
			'NSFW policy depends on each server owner; private servers can set their own rules, but public hosts may be stricter.',
		faviconUrl:
			'https://www.teamspeak.com/user/themes/teamspeak/images/favicon.ico',
		originFlag: '🇩🇪',
		originLabel: 'DE',
		originNote:
			'Originally developed in Germany; if you self-host, jurisdiction is that of your hosting location.',
		warnings: [
			'Some file/image transfers may proxy through TeamSpeak infra even on private servers.',
		],
		isBestBet: true,
		bestBetReason:
			'Self-hostable high-quality voice servers; secure and customizable; low central oversight on private setups.',
	},
	{
		name: 'Fluxer',
		url: 'https://fluxer.app',
		description:
			'Open-source, Discord-style chat and VoIP platform with a focus on control and privacy; public beta with strong feature parity goals.',
		discordFeatures: {
			textChannel: true,
			voiceChannel: true,
			videoChannel: true,
			screenSharing: true,
			customEmojis: true,
			customRoles: true,
			permissions: true,
		},
		pros: [
			'Familiar channel-based interface',
			'Open-source (AGPLv3), self-hostable',
			'Granular moderation, custom CSS, media saving',
			'Multi-device voice join, upcoming federation/E2EE',
		],
		cons: [
			'Very small user base',
			'Ecosystem and documentation are still limited / in beta',
			'Mobile apps coming soon (not fully available yet)',
		],
		popularity: 'less',
		mobileSupport: 'partial',
		mobileNote:
			'Mobile support and client quality are still unclear / coming soon; expect rough edges.',
		nsfwPolicy: 'unknown',
		nsfwNote:
			'NSFW policy not clearly communicated; always read the current TOS and community rules.',
		faviconUrl: 'https://fluxerstatic.com/web/favicon.ico',
		originFlag: '🇸🇪',
		originLabel: 'SE',
		originNote:
			'Smaller indie projects may not clearly state legal jurisdiction; treat them as experimental.',
		warnings: [
			'Indie platforms can shut down quickly or pivot; avoid depending on them for critical communities.',
		],
	},
	{
		name: 'Nerimity',
		url: 'https://nerimity.com',
		description:
			'Indie community chat platform aiming to feel familiar to Discord users while staying simple.',
		discordFeatures: {
			textChannel: true,
			customEmojis: true,
			customRoles: true,
			permissions: true,
		},
		pros: [
			'Lightweight and relatively minimal UI',
			'Focused, small-scale community feel',
		],
		cons: [
			'Limited integrations and ecosystem compared to bigger platforms',
			'Small team means slower development and support',
		],
		popularity: 'less',
		mobileSupport: 'partial',
		mobileNote:
			'Mobile support exists but may lag desktop in polish and features.',
		nsfwPolicy: 'mixed',
		nsfwNote:
			"NSFW handling is likely community/server-specific; check each server's rules and platform-wide TOS.",
		faviconUrl: 'https://nerimity.com/favicon.ico',
		originFlag: '❓',
		originLabel: 'Indie / unclear',
		originNote:
			'Origin and legal jurisdiction are not strongly advertised; assume small indie ownership.',
		warnings: [
			'Small indie project: reliant on few maintainers → sudden outages or policy shifts possible.',
		],
	},
	{
		name: 'SimpleX Chat',
		url: 'https://simplex.chat',
		description:
			'Privacy-maximalist messenger using a different model than typical chat apps, focused on anonymity and metadata protection.',
		discordFeatures: {
			textChannel: true,
			voiceChannel: true,
			videoChannel: true,
			screenSharing: false,
		},
		pros: [
			'Strong focus on privacy and metadata minimization',
			'End-to-end encryption by design',
		],
		cons: [
			'Not a Discord-style community hub; more like a private messenger',
			'Smaller user base and fewer community features',
		],
		popularity: 'less',
		mobileSupport: 'yes',
		mobileNote:
			'Has mobile apps as a primary use case; desktop/web are improving over time.',
		nsfwPolicy: 'mixed',
		nsfwNote:
			'NSFW is not the primary focus; as a private messenger, content policies are more about local law and app stores.',
		faviconUrl: 'https://simplex.chat/img/favicon.ico',
		originFlag: '🇪🇺',
		originLabel: 'EU-focused',
		originNote:
			'Project emphasizes EU-style privacy values; still, laws of your country/app store apply.',
		warnings: [
			'Privacy strong, but device misconfigs, backups, or malware can still leak info.',
		],
	},
	{
		name: 'Session',
		url: 'https://getsession.org',
		description:
			'End-to-end encrypted messenger built on a privacy-preserving network; feels more like Signal than Discord.',
		discordFeatures: {
			textChannel: true,
			voiceChannel: true,
			videoChannel: true,
			screenSharing: false,
		},
		pros: [
			'Strong anonymity focus with onion-routed network',
			'No phone number required to create an account',
		],
		cons: [
			'Not designed for large, Discord-like community servers',
			'Performance can vary because of the underlying privacy network',
		],
		popularity: 'less',
		mobileSupport: 'yes',
		mobileNote:
			'Mobile is a first-class platform; desktop is available but may feel secondary.',
		nsfwPolicy: 'mixed',
		nsfwNote:
			'As a private messenger, NSFW is mostly governed by local law and app store rules rather than public community policies.',
		faviconUrl: 'https://getsession.org/favicon.ico',
		originFlag: '🇦🇺',
		originLabel: 'AU',
		originNote:
			'Project has Australian roots, but the network is globally distributed.',
		warnings: [
			'Privacy-focused, but OS telemetry, backups, or device malware can compromise it.',
		],
	},
	{
		name: 'Jami',
		url: 'https://jami.net',
		description:
			'Free and open-source peer-to-peer communication platform for calls, video, and messaging; fully distributed with no central servers required.',
		discordFeatures: {
			textChannel: true,
			voiceChannel: true,
			videoChannel: true,
			screenSharing: true,
			customEmojis: false,
			customRoles: false,
			permissions: false,
		},
		pros: [
			'True peer-to-peer — no servers, maximum privacy and no metadata leaks to third parties',
			'End-to-end encryption by default',
			'No account or ID verification needed',
			'Self-contained (no federation or hosting required)',
			'Supports group calls and conferences',
		],
		cons: [
			'Not designed for large persistent communities/servers like Discord',
			'Discovery of new users/contacts can be harder (no central directory)',
			'Smaller user base compared to mainstream apps',
			'UI feels more like a classic VoIP/messenger than a server-based community hub',
		],
		popularity: 'less',
		mobileSupport: 'yes',
		mobileNote: 'Strong mobile apps available for iOS and Android.',
		nsfwPolicy: 'allowed',
		nsfwNote:
			'As a P2P tool with no central platform, content is user-controlled; no platform-wide policy.',
		faviconUrl: 'https://jami.net/favicon.ico',
		originFlag: '🇨🇦',
		originLabel: 'CA',
		originNote: 'Led by Savoir-faire Linux in Montréal, Québec, Canada.',
		warnings: [
			'P2P requires direct connectivity; NAT/firewalls may block without helpers (DHT/STUN/TURN).',
		],
	},
	{
		name: 'Rocket.Chat',
		url: 'https://rocket.chat',
		description:
			'Open-source team communication platform with channels, voice/video calls, and self-hosting support; can be configured for community use.',
		discordFeatures: {
			textChannel: true,
			voiceChannel: true,
			videoChannel: true,
			screenSharing: true,
			customEmojis: true,
			customRoles: true,
			permissions: true,
		},
		pros: [
			'Fully self-hostable with strong admin controls',
			'Supports channels, threads, integrations, and bots',
			'End-to-end encryption available in some modes',
			'Mobile and desktop apps available',
			'Flexible for team or community setups',
		],
		cons: [
			'UI more Slack-like than Discord-like by default',
			'Setup can be complex for large-scale communities',
			'Smaller casual/gaming community focus compared to Discord alternatives',
		],
		popularity: 'popular',
		mobileSupport: 'yes',
		mobileNote: 'Official mobile apps with good feature parity.',
		nsfwPolicy: 'mixed',
		nsfwNote:
			'Depends on self-hosted or cloud instance rules; self-hosted gives full control.',
		faviconUrl:
			'https://cdn.prod.website-files.com/611a19b9853b7414a0f6b3f6/6132017c7a979557454a1bf2_favicon%2032px.png',
		originFlag: '🇺🇸',
		originLabel: 'US',
		originNote:
			'Headquartered in Wilmington, Delaware (US), though globally distributed team.',
		warnings: [
			'Cloud version centralized; self-host for full control (some features may tie to registration).',
		],
		isBestBet: true,
		bestBetReason:
			'Mature open-source self-hostable platform with solid voice/video and permission features.',
	},
	{
		name: 'XMPP (Movim client)',
		url: 'https://movim.eu',
		description:
			'Federated open protocol for chat/messaging; Movim provides a modern web-based social client with group chats, feeds, and more (similar to a federated social+chat hub).',
		discordFeatures: {
			textChannel: true,
			voiceChannel: true, // Via extensions/Jingle
			videoChannel: true, // Via extensions
			screenSharing: false,
			customEmojis: true, // Varies by client
			customRoles: false,
			permissions: true, // Server-dependent
		},
		pros: [
			'Fully federated and decentralized (like email)',
			'Many clients available (Movim for web/social feel, Conversations for mobile, etc.)',
			'Self-hostable server (Prosody, ejabberd, etc.)',
			'Strong privacy if using encrypted extensions (OMEMO)',
			'No central company control',
		],
		cons: [
			'Feature support varies greatly by client and server',
			'Voice/video less polished than dedicated VoIP apps',
			'Smaller modern community user base',
			'Setup and federation can be technical',
		],
		popularity: 'less',
		mobileSupport: 'yes',
		mobileNote:
			'Depends on client (e.g., Conversations on Android is excellent).',
		nsfwPolicy: 'mixed',
		nsfwNote: 'Entirely server/community-dependent; self-hosted gives control.',
		faviconUrl: 'https://movim.eu/img/48.png',
		originFlag: '🌍',
		originLabel: 'Global / decentralized',
		originNote:
			'XMPP is a protocol; Movim developed by French contributors (Timothée Jaussoin).',
		warnings: [
			'Features vary heavily by client/server; not as uniform as centralized apps.',
		],
	},
];

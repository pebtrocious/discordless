// discordFeatures logic (as of February 12, 2026):
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
			'Self-hosted Stoat instances cannot seamlessly connect to the official hosted instance; federation is limited.',
			'Media features like video require server preparation and scaling.',
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
			'Even if the TOS promises limited data collection, any centralized platform can change policies over time.',
		],
	},
	{
		name: 'Valour',
		url: 'https://valour.gg',
		description:
			'Open-source, community-first chat client with multi-window support and economy rewards; volunteer-built, privacy-focused.',
		discordFeatures: {
			textChannel: true,
			voiceChannel: true,
			customEmojis: true,
			customRoles: true,
			permissions: true,
		},
		pros: [
			'Privacy-first — never sells data, transparent open-source code',
			'No heavy ID checking',
			'Community-driven with customizable themes',
			'Low data collection',
			'Multi-window channels for power users',
		],
		cons: [
			'Alpha/ongoing stage — buggy/in development',
			'Centralized hosting (no self-hosting)',
			'Lacks full voice/screen sharing details or maturity',
			'Smaller ecosystem',
		],
		popularity: 'popular',
		mobileSupport: 'partial',
		mobileNote:
			'Mobile support is in progress; expect rough edges and missing features compared to desktop.',
		nsfwPolicy: 'mixed',
		nsfwNote:
			'NSFW tolerance depends on individual communities and admins; always read the specific server rules.',
		faviconUrl: 'https://valour.gg/favicon.ico',
		originFlag: '🇨🇦',
		originLabel: 'CA',
		originNote:
			'Project appears to be developed by a small international team; hosting/legal jurisdiction may vary.',
		warnings: [
			'Early-stage projects can change ownership, funding, or policies quickly; don’t rely on long-term guarantees.',
		],
	},
	{
		name: 'Matrix',
		url: 'https://matrix.org',
		description:
			'Federated open-source protocol for decentralized chat. Clients include Element, Cinny, and Commet.',
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
			'Even with end-to-end encryption, metadata (who talks to whom, when) can still be visible to homeservers.',
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
			'Images and some file transfers may still be proxied through TeamSpeak infrastructure, even when you run a private server.',
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
			'Small indie platforms often rely on few maintainers; outages and policy changes can be sudden.',
		],
	},
	{
		name: 'Sharkord',
		url: 'https://sharkord.com/',
		description:
			'Lightweight, self-hosted, open-source chat server for small groups.',
		discordFeatures: {
			textChannel: true,
			voiceChannel: true,
			videoChannel: true,
			screenSharing: true,
			customEmojis: true,
		},
		pros: [
			'Completely self-hostable, no central server',
			'Low self-hosted server requirements',
			'4K@60FPS video quality',
			'No artifical feature or user count limits'
		],
		cons: [
			'No app, web only',
			'Currently early in development',
		],
		popularity: 'less',
		mobileSupport: 'no',
		mobileNote:
			'Marked as \'not yet\', so potentially in future',
		nsfwPolicy: 'allowed',
		nsfwNote:
			'Dependent on your host\'s/ISP acceptable use policy.',
		faviconUrl: 'https://sharkord.com/favicon.ico',
		originFlag: '🌍',
		originLabel: 'Global',
		originNote:
			'',
		warnings: [
			'Due to bugs, was unable to successfully do a voice chat / screenshare test as of Feb 12, 2026.',
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
			'High privacy tools can still leak information if users misconfigure devices or backups.',
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
			'Even privacy-focused messengers can be affected by operating system telemetry, backups, or malware on the device.',
		],
	},
];

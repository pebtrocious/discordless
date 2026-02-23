import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Discordless - Discord Alternatives Comparison',
	description:
		'Explore privacy-focused, open-source, and decentralized alternatives to Discord. Compare features, security, and more.',
	metadataBase: new URL('https://discordless.com'),
	openGraph: {
		title: 'Discordless - Discord Alternatives Comparison',
		description:
			'Explore privacy-focused, open-source, and decentralized alternatives to Discord. Compare features, security, and more.',
		url: '/',
		siteName: 'Discordless',
		images: [
			{
				url: '/preview.png',
				width: 1200,
				height: 630,
				alt: 'Discordless preview image featuring a stylized dead Discord logo',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		site: '@pebtrocious',
		creator: '@pebtrocious',
		title: 'Discordless - Discord Alternatives Comparison',
		description:
			'Explore privacy-focused, open-source, and decentralized alternatives to Discord. Compare features, security, and more.',
		images: ['/preview.png'],
	},
	icons: {
		icon: [
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{
				url: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				url: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
		apple: '/apple-touch-icon.png',
		shortcut: '/apple-touch-icon.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}

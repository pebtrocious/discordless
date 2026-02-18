import type { ComponentType } from 'react';

import { ArrowRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { cn } from '@/lib/utils';

const featuresList = [
	{
		title: 'Discord-like features',
		description:
			'Text channels, voice and video calls, roles, permissions, custom emojis, bots, and a similar user experience.',
		cardBorderColor:
			'border-blue-600/40 hover:border-blue-600 dark:border-blue-400/40 dark:hover:border-blue-400',
	},
	{
		title: 'Security',
		description:
			'End-to-end encryption where available, no tracking by default, minimal data collection, and strong protection against surveillance or leaks.',
		cardBorderColor:
			'border-emerald-600/40 hover:border-emerald-600 dark:border-emerald-400/40 dark:hover:border-emerald-400',
	},
	{
		title: 'Open source',
		description:
			'The entire client and server code is publicly available. You can review it, self-host it, fork it, or contribute improvements.',
		cardBorderColor:
			'border-violet-600/40 hover:border-violet-600 dark:border-violet-400/40 dark:hover:border-violet-400',
	},
	{
		title: 'User base count and Ratings',
		description:
			'Shows how much active users there is and their ratings of a platform, so you can judge popularity and quality.',
		cardBorderColor:
			'border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400',
	},
	{
		title: 'Decentralization',
		description:
			'Uses federation or allows full self-hosting. No single company controls the network or can delete your servers or accounts.',
		cardBorderColor:
			'border-cyan-600/40 hover:border-cyan-600 dark:border-cyan-400/40 dark:hover:border-cyan-400',
	},
	{
		title: 'Country of origin',
		description:
			'The legal jurisdiction and country where the main developers or organization are based. Important for privacy law and government access risks.',
		cardBorderColor:
			'border-indigo-600/40 hover:border-indigo-600 dark:border-indigo-400/40 dark:hover:border-indigo-400',
	},
	{
		title: 'NSFW policies',
		description:
			'How the platform handles adult or explicit content: strict bans, age gates, user-controlled tags, or full freedom with labeling options.',
		cardBorderColor:
			'border-pink-600/40 hover:border-pink-600 dark:border-pink-400/40 dark:hover:border-pink-400',
	},
	{
		title: 'AI policies',
		description:
			'Rules about AI training on user messages, allowing AI bots, generated content restrictions, or moderation by AI systems.',
		cardBorderColor:
			'border-rose-600/40 hover:border-rose-600 dark:border-rose-400/40 dark:hover:border-rose-400',
	},
	{
		title: 'Available apps',
		description:
			'Official or well-maintained clients for web browsers, Windows, macOS, Linux, iOS, and Android so you can use it everywhere.',
		cardBorderColor:
			'border-teal-600/40 hover:border-teal-600 dark:border-teal-400/40 dark:hover:border-teal-400',
	},
];

export default function FeaturesSection() {
	return (
		<section className='py-8 sm:py-16 lg:py-24'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='mb-12 space-y-4 sm:mb-16 lg:mb-24'>
					<h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
						What you'll find here
					</h2>
					<p className='text-muted-foreground text-xl'>
						A clear overview of the information we provide for each alternative.
					</p>
					<Button
						variant='outline'
						className='rounded-lg text-base shadow-none has-[>svg]:px-6'
						size='lg'
						asChild
					>
						<a href='/alternatives'>
							Check alternatives
							<ArrowRightIcon />
						</a>
					</Button>
				</div>

				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
					{featuresList.map((features, index) => (
						<Card
							key={index}
							className={cn(
								'shadow-none transition-colors duration-300',
								features.cardBorderColor,
							)}
						>
							<CardContent>
								<h6 className='mb-2 text-lg font-semibold'>{features.title}</h6>
								<p className='text-muted-foreground'>{features.description}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

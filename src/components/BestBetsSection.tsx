import { Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { alternatives } from '@/data/alternatives';

const faviconMap: Record<string, string> = {
	Stoat: 'https://stoat.chat/favicon.svg',
	Matrix: 'https://matrix.org/images/matrix-favicon.svg',
	TeamSpeak:
		'https://www.teamspeak.com/user/themes/teamspeak/images/favicon.ico',
};

const BestBetsSection = () => {
	const bestBets = alternatives.filter((a) => a.isBestBet);

	return (
		<section
			id='best-bets'
			className='py-20 px-4 sm:px-6 lg:px-8 bg-muted/20'
		>
			<div className='mx-auto max-w-7xl'>
				<div className='mb-12 text-center'>
					<Badge className='mb-4 border-none bg-vibrant-purple/15 text-vibrant-purple'>
						Decentralized by design
					</Badge>
					<h2 className='font-display text-3xl font-bold tracking-tight sm:text-4xl'>
						Best Bets for{' '}
						<span className='bg-gradient-to-r from-primary to-vibrant-purple bg-clip-text text-transparent'>
							True Freedom
						</span>
					</h2>
					<p className='mx-auto mt-4 max-w-2xl text-muted-foreground'>
						These stand out because they are decentralized by design — no single
						company or government can fully control or shut them down. They
						offer public servers/instances, so you can join easily without
						self-hosting.
					</p>
				</div>

				<div className='grid gap-8 md:grid-cols-3'>
					{bestBets.map((alt) => {
						const initials = alt.name
							.split(' ')
							.map((word) => word[0])
							.join('')
							.slice(0, 2)
							.toUpperCase();

						const favicon = faviconMap[alt.name];

						return (
							<Card
								key={alt.name}
								className='border-vibrant-purple/20 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5'
							>
								<CardHeader>
									<div className='mb-2 flex items-center justify-between gap-3'>
										<CardTitle className='font-display text-xl'>
											{alt.name}
										</CardTitle>
										<Avatar className='h-9 w-9 border border-border/70 bg-muted/60'>
											{favicon && (
												<AvatarImage
													src={favicon}
													alt={`${alt.name} logo`}
													className='object-contain p-1'
												/>
											)}
											<AvatarFallback className='text-xs font-semibold uppercase tracking-wide'>
												{initials}
											</AvatarFallback>
										</Avatar>
									</div>
								</CardHeader>
								<CardContent className='space-y-3'>
									<p className='text-sm leading-relaxed text-muted-foreground'>
										{alt.bestBetReason}
									</p>
								</CardContent>
							</Card>
						);
					})}
				</div>

				<div className='mt-10 rounded-xl border border-border/60 bg-muted/30 p-6'>
					<h3 className='font-display text-lg font-semibold'>
						What all of these get right
					</h3>
					<p className='mt-3 text-sm text-muted-foreground'>
						Each of these options moves you away from a single, centralized
						company deciding whether your community lives or dies.
					</p>
					<ul className='mt-4 space-y-2 text-sm text-muted-foreground'>
						<li className='flex items-start gap-2'>
							<span className='mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400' />
							Resilience against shutdowns and sudden policy changes
						</li>
						<li className='flex items-start gap-2'>
							<span className='mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary' />
							More ownership over your data, infrastructure, or server choice
						</li>
						<li className='flex items-start gap-2'>
							<span className='mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-vibrant-purple' />
							Better alignment with privacy, free association, and long‑term
							stability
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
};

export default BestBetsSection;

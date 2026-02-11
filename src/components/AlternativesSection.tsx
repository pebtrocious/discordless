import { ExternalLink, Check, AlertTriangle } from 'lucide-react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { alternatives } from '@/data/alternatives';

const faviconMap: Record<string, string> = {
	Root: 'https://cdn.prod.website-files.com/6792bf217e6993766175e274/6792bf217e6993766175e44d_Group%201171274974%201%20(2).png',
	Valour: 'https://valour.gg/favicon.ico',
	Stoat: 'https://stoat.chat/favicon.svg',
	Matrix: 'https://matrix.org/images/matrix-favicon.svg',
	TeamSpeak:
		'https://www.teamspeak.com/user/themes/teamspeak/images/favicon.ico',
};

const AlternativesSection = () => {
	return (
		<section
			id='alternatives'
			className='py-20 px-4 sm:px-6 lg:px-8'
		>
			<div className='mx-auto max-w-7xl'>
				<div className='mb-12 text-center'>
					<h2 className='font-display text-3xl font-bold tracking-tight sm:text-4xl'>
						Popular Discord{' '}
						<span className='bg-gradient-to-r from-electric-blue to-vibrant-purple bg-clip-text text-transparent'>
							Alternatives
						</span>
					</h2>
					<p className='mx-auto mt-4 max-w-2xl text-muted-foreground'>
						A mix of different platforms — some decentralized, some centralized
						— that people are turning to as they look for something less fragile
						than putting everything on Discord.
					</p>
				</div>

				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
					{alternatives.map((alt) => {
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
								className='group flex flex-col transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5'
							>
								<CardHeader>
									<div className='flex items-center justify-between gap-3'>
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
									<CardDescription className='text-sm leading-relaxed'>
										{alt.description}
									</CardDescription>
								</CardHeader>

								<CardContent className='flex-1 space-y-4'>
									<div className='rounded-lg bg-muted/40 p-3'>
										<h4 className='mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
											Pros
										</h4>
										<ul className='space-y-1.5'>
											{alt.pros.map((pro, i) => (
												<li
													key={i}
													className='flex items-start gap-2 text-sm text-muted-foreground'
												>
													<Check className='mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400' />
													<span>{pro}</span>
												</li>
											))}
										</ul>
									</div>

									<div className='rounded-lg bg-muted/40 p-3'>
										<h4 className='mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
											Cons
										</h4>
										<ul className='space-y-1.5'>
											{alt.cons.map((con, i) => (
												<li
													key={i}
													className='flex items-start gap-2 text-sm text-muted-foreground'
												>
													<AlertTriangle className='mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400' />
													<span>{con}</span>
												</li>
											))}
										</ul>
									</div>
								</CardContent>

								<CardFooter>
									<Button
										asChild
										variant='outline'
										className='w-full gap-2 border-border hover:border-primary hover:text-primary'
									>
										<a
											href={alt.url}
											target='_blank'
											rel='noopener noreferrer'
										>
											Visit {alt.name} <ExternalLink className='h-4 w-4' />
										</a>
									</Button>
								</CardFooter>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default AlternativesSection;

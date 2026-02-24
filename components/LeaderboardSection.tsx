import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import dbConnect from '@/lib/mongodb';
// @ts-ignore
import Alternative from '@/models/Alternative';
import type { AlternativeLean } from '@/models/Alternative';

export default async function LeaderboardSection() {
	await dbConnect();
	const alternativesUsers = await Alternative.find({})
		.sort({ 'data.users.amount': -1 })
		.limit(3)
		.lean();
	const alternativesRating = await Alternative.find({})
		.sort({ 'data.users.rating': -1 })
		.limit(3)
		.lean();
	const alternativesReccomend = await Alternative.find({})
		.sort({ recommend: -1 })
		.limit(3)
		.lean();
	return (
		<section className='py-8 sm:py-12 lg:py-16'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='mb-10 space-y-3 sm:mb-12 lg:mb-16 text-center'>
					<h2 className='text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl'>
						Top Picks
					</h2>
					<p className='text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto'>
						See what alternatives people are choosing and how they rate them.
						<br />
						More details{' '}
						<a
							href='/alternatives'
							className='font-bold hover:underline'
						>
							here
						</a>
					</p>
				</div>

				<Tabs
					defaultValue='recommended'
					className='w-full'
				>
					<div className='flex justify-center mb-6 sm:mb-8'>
						<TabsList className='grid w-full max-w-md grid-cols-3'>
							<TabsTrigger value='user-base'>User Base</TabsTrigger>
							<TabsTrigger value='recommended'>Recommended</TabsTrigger>
							<TabsTrigger value='user-ratings'>Ratings</TabsTrigger>
						</TabsList>
					</div>

					<TabsContent value='user-base'>
						<LeaderboardContent alternatives={alternativesUsers} />
					</TabsContent>
					<TabsContent value='recommended'>
						<LeaderboardContent alternatives={alternativesReccomend} />
					</TabsContent>
					<TabsContent value='user-ratings'>
						<LeaderboardContent alternatives={alternativesRating} />
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}

function LeaderboardContent({
	alternatives,
}: {
	alternatives: AlternativeLean[];
}) {
	return (
		<>
			{/* Desktop */}
			<div className='hidden sm:flex flex-row items-end justify-center gap-5 md:gap-6 lg:gap-8 mt-6 md:mt-10'>
				{/* 2nd */}
				<PodiumItem
					item={alternatives[1]}
					position={2}
					size='medium'
					badgeColor='bg-slate-300 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
				/>

				{/* 1st */}
				<PodiumItem
					item={alternatives[0]}
					position={1}
					size='large'
					badgeColor='bg-yellow-400 text-yellow-950 dark:bg-yellow-500 dark:text-yellow-950'
					className='-translate-y-5 md:-translate-y-8 lg:-translate-y-10'
					cardClassName='border-2 border-yellow-400/50 shadow-xl hover:shadow-2xl'
				/>

				{/* 3rd */}
				<PodiumItem
					item={alternatives[2]}
					position={3}
					size='medium'
					badgeColor='bg-amber-600/80 text-amber-950 dark:bg-amber-700 dark:text-amber-200'
				/>
			</div>

			{/* Mobile */}
			<div className='sm:hidden space-y-4 mt-6'>
				{alternatives.map((item, index) => (
					<Card
						key={index + 1}
						className='overflow-hidden shadow-md'
					>
						<div className='flex items-center gap-4 p-4'>
							<div className='relative flex-shrink-0'>
								<Badge
									className={cn(
										'absolute -top-2 -left-2 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow',
										index + 1 === 1
											? 'bg-yellow-400 text-yellow-950'
											: index + 1 === 2
												? 'bg-slate-300 text-slate-800'
												: 'bg-amber-600/90 text-amber-950',
									)}
								>
									{index + 1}
								</Badge>

								<Avatar className='w-16 h-16 border-2 border-background'>
									<AvatarImage
										src={item.image}
										alt={item.name}
									/>
									<AvatarFallback>{item.name.slice(0, 2)}</AvatarFallback>
								</Avatar>
							</div>

							<div className='flex-1 min-w-0'>
								<h3 className='font-semibold text-base truncate'>
									{item.name}
								</h3>
								<div className='flex gap-3 mt-1.5'>
									<Badge
										variant='secondary'
										className='text-xs'
									>
										★ {item.data.users.rating}
									</Badge>
									<Badge
										variant='secondary'
										className='text-xs'
									>
										{item.data.users.amount} users
									</Badge>
								</div>
							</div>
						</div>
					</Card>
				))}
			</div>
		</>
	);
}

type PodiumItemProps = {
	// @ts-ignore
	item: (typeof items)[number];
	position: number;
	size: 'medium' | 'large';
	badgeColor: string;
	className?: string;
	cardClassName?: string;
};

function PodiumItem({
	item,
	position,
	size,
	badgeColor,
	className = '',
	cardClassName = '',
}: PodiumItemProps) {
	const isLarge = size === 'large';

	return (
		<div
			className={cn(
				'flex flex-col items-center flex-1',
				isLarge
					? 'max-w-[240px] md:max-w-[260px] lg:max-w-[280px]'
					: 'max-w-[170px] md:max-w-[210px] lg:max-w-[230px]',
				className,
			)}
		>
			<Badge
				className={cn(
					'mb-3 md:mb-4 lg:mb-5 rounded-full flex items-center justify-center font-bold shadow',
					isLarge
						? 'w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 text-2xl'
						: 'w-11 h-11 md:w-12 md:h-12 lg:w-13 lg:h-13 text-xl',
					badgeColor,
				)}
			>
				{position}
			</Badge>

			<Card
				className={cn(
					'w-full shadow-md transition-all hover:shadow-lg',
					cardClassName,
				)}
			>
				<CardHeader
					className={cn(
						'flex flex-col items-center',
						isLarge ? 'pt-7 pb-5' : 'pt-6 pb-4',
					)}
				>
					<Avatar
						className={cn(
							'border-2 border-background',
							isLarge
								? 'w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32'
								: 'w-20 h-20 md:w-24 md:h-24',
						)}
					>
						<AvatarImage
							src={item.image}
							alt={item.name}
						/>
						<AvatarFallback className={isLarge ? 'text-2xl' : 'text-xl'}>
							{item.name.slice(0, 2)}
						</AvatarFallback>
					</Avatar>
					<h3
						className={cn(
							'mt-3 text-center font-semibold line-clamp-1',
							isLarge
								? 'text-lg md:text-xl lg:text-2xl'
								: 'text-base md:text-lg',
						)}
					>
						{item.name}
					</h3>
				</CardHeader>
				<CardContent
					className={cn(
						'flex flex-col sm:flex-row gap-2.5 justify-center pb-6 md:pb-7',
						isLarge && 'pb-8',
					)}
				>
					<Badge
						variant='secondary'
						className={isLarge ? 'text-sm px-3 py-1' : 'text-xs'}
					>
						★ {item.data.users.rating.toFixed(1)}
					</Badge>
					<Badge
						variant='secondary'
						className={isLarge ? 'text-sm px-3 py-1' : 'text-xs'}
					>
						{item.data.users.amount} users
					</Badge>
				</CardContent>
			</Card>
		</div>
	);
}

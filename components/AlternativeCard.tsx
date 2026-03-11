'use client';

import { Button } from '@/components/ui/button';
import { Users, Star, ExternalLink } from 'lucide-react';
import type { AlternativeLean } from '@/models/Alternative';
import Image from 'next/image';

interface AlternativeCardProps {
	alternative: AlternativeLean;
	onShowDetails: (alt: AlternativeLean) => void;
}

export default function AlternativeCard({
	alternative: alt,
	onShowDetails,
}: AlternativeCardProps) {
	const features = Object.values(alt.data.discord).filter(
		(f: any) => f.status === 'available',
	).length;

	return (
		<div
			className='group aspect-square bg-card border border-border rounded-2xl p-6 flex flex-col hover:border-border/80 hover:bg-card/80 transition-all duration-200 cursor-pointer overflow-hidden'
			onClick={() => onShowDetails(alt)}
		>
			<div className='flex flex-col items-center text-center flex-shrink-0'>
				<Image
					src={alt.image}
					alt={alt.name}
					width={250}
					height={250}
					className='w-28 h-28 sm:w-12 sm:h-12 rounded-xl object-cover border border-border'
				/>
				<h3 className='mt-3 text-sm font-medium tracking-tight truncate w-full leading-tight'>
					{alt.name}
				</h3>
				<div className='flex items-center gap-3 mt-1.5'>
					<div className='flex items-center gap-1'>
						<Star className='h-3 w-3 text-amber-400 fill-amber-400' />
						<span className='text-xs text-muted-foreground font-mono'>
							{alt.data.users.rating.toFixed(1)}
						</span>
					</div>
					<div className='flex items-center gap-1 text-muted-foreground'>
						<Users className='h-3 w-3' />
						<span className='text-xs font-mono tabular-nums'>
							{alt.data.users.amount.toLocaleString({useGrouping: true})}
						</span>
					</div>
				</div>
			</div>

			<div className='mt-4 sm:mt-auto grid grid-cols-3 gap-2 flex-shrink-0'>
				<div className='bg-muted/40 rounded-xl px-3 py-2.5 flex flex-col items-center justify-center'>
					<span className='text-xl font-semibold tabular-nums tracking-tight leading-none'>
						{features}
						<span className='text-xs text-muted-foreground font-normal'>
							/8
						</span>
					</span>
					<span className='text-[9px] tracking-widest text-muted-foreground mt-1 uppercase'>
						Features
					</span>
				</div>

				<div className='bg-emerald-500/5 rounded-xl px-3 py-2.5 flex flex-col items-center justify-center'>
					<span className='text-xl font-semibold tabular-nums tracking-tight leading-none text-emerald-500'>
						{alt.data.pros.length}
					</span>
					<span className='text-[9px] tracking-widest text-muted-foreground mt-1 uppercase'>
						Pros
					</span>
				</div>

				<div className='bg-rose-500/5 rounded-xl px-3 py-2.5 flex flex-col items-center justify-center'>
					<span className='text-xl font-semibold tabular-nums tracking-tight leading-none text-rose-500'>
						{alt.data.cons.length}
					</span>
					<span className='text-[9px] tracking-widest text-muted-foreground mt-1 uppercase'>
						Cons
					</span>
				</div>
			</div>

			<div className='mt-3 grid grid-cols-2 gap-2 flex-shrink-0'>
				{alt.website && (
					<Button
						variant='outline'
						size='sm'
						className='h-8 text-xs rounded-lg gap-1.5 font-normal'
						onClick={(e) => {
							e.stopPropagation();
							window.open(alt.website, '_blank', 'noopener,noreferrer');
						}}
					>
						<ExternalLink className='h-3 w-3' />
						Website
					</Button>
				)}
				<Button
					size='sm'
					className='h-8 text-xs rounded-lg font-normal'
					onClick={(e) => {
						e.stopPropagation();
						onShowDetails(alt);
					}}
				>
					Details
				</Button>
			</div>
		</div>
	);
}

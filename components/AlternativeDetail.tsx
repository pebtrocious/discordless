'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import {
	Github,
	ExternalLink,
	X,
	Star,
	Users,
	Check,
	Minus,
	Clock,
	HelpCircle,
	Info,
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

import RatingCard from '@/components/RatingCard';
import type { AlternativeLean } from '@/models/Alternative';

interface AlternativeDetailProps {
	alternative: AlternativeLean;
	isRated: boolean | undefined;
	onClose: () => void;
}

const StatusIcon = ({ status }: { status: string }) => {
	switch (status) {
		case 'available':
			return <Check className='h-3.5 w-3.5 text-emerald-500' />;
		case 'development':
			return <Clock className='h-3.5 w-3.5 text-amber-500' />;
		case 'missing':
			return <Minus className='h-3.5 w-3.5 text-muted-foreground/40' />;
		default:
			return <HelpCircle className='h-3.5 w-3.5 text-muted-foreground/40' />;
	}
};

const statusLabel: Record<string, string> = {
	available: 'Available',
	development: 'In development',
	missing: 'Missing',
	unknown: 'Unknown',
};

const featureLabel = (key: string) =>
	key
		.replace(/([A-Z])/g, ' $1')
		.trim()
		.replace(/^\w/, (c) => c.toUpperCase());

function InfoNote({ note }: { note: string }) {
	const [open, setOpen] = useState(false);
	if (!note) return null;
	return (
		<Tooltip
			open={open}
			onOpenChange={setOpen}
		>
			<TooltipTrigger asChild>
				<span
					className='inline-flex items-center cursor-pointer flex-shrink-0'
					onClick={(e) => {
						e.stopPropagation();
						setOpen((v) => !v);
					}}
				>
					<Info className='h-3.5 w-3.5 text-foreground/40 hover:text-foreground/80 transition-colors' />
				</span>
			</TooltipTrigger>
			<TooltipContent
				side='top'
				className='max-w-xs text-xs'
			>
				{note}
			</TooltipContent>
		</Tooltip>
	);
}

function TagTooltip({
	note,
	children,
}: {
	note: string;
	children: React.ReactNode;
}) {
	const [open, setOpen] = useState(false);
	if (!note) return <>{children}</>;
	return (
		<Tooltip
			open={open}
			onOpenChange={setOpen}
		>
			<TooltipTrigger asChild>
				<span
					className='cursor-pointer'
					onClick={() => setOpen((v) => !v)}
				>
					{children}
				</span>
			</TooltipTrigger>
			<TooltipContent
				side='top'
				className='max-w-xs text-xs'
			>
				{note}
			</TooltipContent>
		</Tooltip>
	);
}

function SectionLabel({ children }: { children: React.ReactNode }) {
	return (
		<h2 className='text-[10px] tracking-widest text-muted-foreground/50 uppercase mb-3'>
			{children}
		</h2>
	);
}

export default function AlternativeDetail({
	alternative,
	isRated,
	onClose,
}: AlternativeDetailProps) {
	const { data } = alternative;
	const [showRating, setShowRating] = useState(false);

	const availableApps = Object.entries(data.apps)
		.filter(([, v]) => v.status === 'available')
		.map(([k]) => k.charAt(0).toUpperCase() + k.slice(1));

	const tags = [
		{
			label:
				data.openSource.status === 'available'
					? 'Open source'
					: 'Closed source',
			note: data.openSource.note,
		},
		{
			label:
				data.decentralization.status === 'available'
					? 'Decentralized'
					: 'Centralized',
			note: data.decentralization.note,
		},
		{ label: `NSFW: ${data.nsfw.status}`, note: data.nsfw.note },
	];

	return (
		<TooltipProvider delayDuration={100}>
			<div className='h-full flex flex-col'>
				<div className='sticky top-0 z-10 bg-card/90 backdrop-blur-sm border-b border-border flex items-center justify-between px-5 py-3 flex-shrink-0'>
					<div className='flex items-center gap-2.5'>
						<Avatar className='h-6 w-6 border border-border'>
							<AvatarImage src={alternative.image} />
							<AvatarFallback className='text-[10px]'>
								{alternative.name.slice(0, 2)}
							</AvatarFallback>
						</Avatar>
						<span className='text-sm font-medium'>{alternative.name}</span>
					</div>
					<div className='flex items-center gap-1.5'>
						{alternative.website && (
							<Button
								variant='ghost'
								size='sm'
								className='h-7 gap-1.5 text-xs'
								asChild
							>
								<a
									href={alternative.website}
									target='_blank'
									rel='noopener noreferrer'
								>
									<ExternalLink className='h-3 w-3' />
									Website
								</a>
							</Button>
						)}
						{data.openSource.repository && (
							<Button
								variant='ghost'
								size='sm'
								className='h-7 gap-1.5 text-xs'
								asChild
							>
								<a
									href={data.openSource.repository}
									target='_blank'
									rel='noopener noreferrer'
								>
									<Github className='h-3 w-3' />
									GitHub
								</a>
							</Button>
						)}
						<Button
							variant='ghost'
							size='icon'
							className='h-7 w-7'
							onClick={onClose}
						>
							<X className='h-3.5 w-3.5' />
						</Button>
					</div>
				</div>

				<div className='flex-1 overflow-y-auto px-8 py-8 space-y-8'>
					{/* Hero */}
					<div className='flex flex-col items-center text-center gap-3'>
						<Avatar className='h-16 w-16 border border-border'>
							<AvatarImage src={alternative.image} />
							<AvatarFallback className='text-xl'>
								{alternative.name.slice(0, 2)}
							</AvatarFallback>
						</Avatar>
						<div>
							<h1 className='text-xl font-medium tracking-tight'>
								{alternative.name}
							</h1>
							<p className='mt-1.5 text-xs text-muted-foreground leading-relaxed max-w-md'>
								{alternative.description}
							</p>
						</div>
						<div className='flex items-center gap-5 text-muted-foreground'>
							<div className='flex items-center gap-1.5'>
								<Users className='h-3 w-3' />
								<span className='font-mono text-xs'>
									{data.users.amount.toLocaleString()}
								</span>
							</div>
							<div className='flex items-center gap-1.5'>
								<Star className='h-3 w-3 text-amber-400 fill-amber-400' />
								<span className='font-mono text-xs'>
									{data.users.rating.toFixed(1)}
								</span>
							</div>
							<span className='text-xs flex items-center gap-1'>
								{data.country.flag} {data.country.name}
								<InfoNote note={data.country.note} />
							</span>
						</div>
						<div className='flex flex-wrap justify-center gap-1.5'>
							{tags.map(({ label, note }) => (
								<TagTooltip
									key={label}
									note={note}
								>
									<span className='text-[11px] px-2.5 py-1 rounded-lg bg-muted text-muted-foreground hover:bg-muted/60 transition-colors flex items-center gap-1'>
										{label}
										{note && <Info className='h-3 w-3 text-foreground/40' />}
									</span>
								</TagTooltip>
							))}
						</div>
						{!isRated && (
							<div className='flex flex-wrap justify-center gap-1.5'>
								<Button
									size='sm'
									className='h-8 text-xs rounded-lg font-normal'
									onClick={() => setShowRating(true)}
								>
									Rate this app
								</Button>
							</div>
						)}
						{isRated && (
							<p className='text-xs text-muted-foreground'>
								You've already rated this.
							</p>
						)}
					</div>

					<Separator />

					{data.warnings.length > 0 && (
						<>
							<div>
								<SectionLabel>Warnings</SectionLabel>
								<div className='space-y-2'>
									{data.warnings.map((w, i) => (
										<div
											key={i}
											className='bg-rose-500/5 border border-rose-500/10 rounded-xl px-3 py-2.5 flex items-start justify-between gap-2'
										>
											<p className='text-xs leading-relaxed text-rose-400/80'>
												{w.text}
											</p>
											<InfoNote note={w.note} />
										</div>
									))}
								</div>
							</div>
							<Separator />
						</>
					)}

					<div className='grid grid-cols-2 gap-8'>
						<div>
							<SectionLabel>Advantages ({data.pros.length})</SectionLabel>
							<ul className='space-y-2.5'>
								{data.pros.map((item, i) => (
									<li
										key={i}
										className='flex items-start gap-2 text-xs'
									>
										<span className='text-emerald-500 flex-shrink-0 mt-0.5'>
											•
										</span>
										<span className='leading-relaxed text-muted-foreground flex-1'>
											{item.text}
										</span>
										<InfoNote note={item.note} />
									</li>
								))}
							</ul>
						</div>
						<div>
							<SectionLabel>Limitations ({data.cons.length})</SectionLabel>
							<ul className='space-y-2.5'>
								{data.cons.map((item, i) => (
									<li
										key={i}
										className='flex items-start gap-2 text-xs'
									>
										<span className='text-rose-500 flex-shrink-0 mt-0.5'>
											•
										</span>
										<span className='leading-relaxed text-muted-foreground flex-1'>
											{item.text}
										</span>
										<InfoNote note={item.note} />
									</li>
								))}
							</ul>
						</div>
					</div>

					<Separator />

					<div>
						<SectionLabel>Discord-like features</SectionLabel>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8'>
							{Object.entries(data.discord).map(([key, feature]) => (
								<div
									key={key}
									className='flex items-center justify-between py-2 border-b border-border/40 -mx-2 px-2'
								>
									<span className='text-xs text-muted-foreground'>
										{featureLabel(key)}
									</span>
									<div className='flex items-center gap-1.5'>
										<StatusIcon status={feature.status} />
										<span className='text-[11px] text-muted-foreground/50'>
											{statusLabel[feature.status]}
										</span>
										<InfoNote note={feature.note} />
									</div>
								</div>
							))}
						</div>
					</div>

					<Separator />

					<div>
						<SectionLabel>Security &amp; Privacy</SectionLabel>
						<div className='space-y-2'>
							<div className='flex items-center justify-between -mx-2 px-2 py-1.5'>
								<span className='text-xs text-muted-foreground flex items-center gap-1.5'>
									End-to-end encryption
									<InfoNote note={data.security.e2ee.note} />
								</span>
								<div className='flex items-center gap-1.5'>
									<StatusIcon status={data.security.e2ee.status} />
									<span className='text-[11px] text-muted-foreground/50'>
										{statusLabel[data.security.e2ee.status]}
									</span>
								</div>
							</div>
							{data.security.dataCollection && (
								<div className='bg-muted/30 rounded-xl px-3 py-2.5 mt-1'>
									<p className='text-[10px] tracking-widest text-muted-foreground/50 uppercase mb-1'>
										Data collection
									</p>
									<p className='text-xs text-muted-foreground leading-relaxed'>
										{data.security.dataCollection}
									</p>
								</div>
							)}
						</div>
					</div>

					{data.ai.text && (
						<>
							<Separator />
							<div>
								<SectionLabel>AI Integration</SectionLabel>
								<div className='bg-muted/30 rounded-xl px-3 py-2.5'>
									<p className='text-xs text-muted-foreground leading-relaxed'>
										{data.ai.text}
									</p>
								</div>
							</div>
						</>
					)}

					{availableApps.length > 0 && (
						<>
							<Separator />
							<div>
								<SectionLabel>Available on</SectionLabel>
								<div className='flex flex-wrap gap-1.5'>
									{availableApps.map((app) => (
										<span
											key={app}
											className='text-[11px] px-2.5 py-1 rounded-lg bg-muted text-muted-foreground'
										>
											{app}
										</span>
									))}
								</div>
							</div>
						</>
					)}

					<p className='text-center text-[10px] tracking-widest text-muted-foreground/30 uppercase pt-2'>
						Last edited —{' '}
						{format(
							new Date(alternative.updatedAt),
							'dd MMMM yyyy',
						).toUpperCase()}
					</p>
				</div>
			</div>

			{/* Rating Card Dialog */}
			<Dialog
				open={showRating}
				onOpenChange={setShowRating}
			>
				<DialogContent className='sm:max-w-md'>
					<DialogTitle>Rate {alternative.name}</DialogTitle>
					<RatingCard
						alternativeId={alternative._id.toString()}
						onSuccess={() => setShowRating(false)}
					/>
				</DialogContent>
			</Dialog>
		</TooltipProvider>
	);
}

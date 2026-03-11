'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface AlternativesFiltersProps {
	searchTerm: string;
	onSearchChange: (value: string) => void;
	sortBy: 'rating' | 'users' | 'features' | 'name' | 'updated';
	onSortChange: (
		value: 'rating' | 'users' | 'features' | 'name' | 'updated',
	) => void;
	minRating: number;
	onMinRatingChange: (value: number) => void;
	minUsers: string;
	onMinUsersChange: (value: string) => void;
	openSourceOnly: boolean;
	onOpenSourceChange: (checked: boolean) => void;
	decentralizedOnly: boolean;
	onDecentralizedChange: (checked: boolean) => void;
	e2eeOnly: boolean;
	onE2eeChange: (checked: boolean) => void;
	selectedNsfw: string[];
	onNsfwToggle: (status: string) => void;
	selectedPlatforms: string[];
	onPlatformToggle: (platform: string) => void;
	onClearAll: () => void;
}

const NSFW_OPTIONS = [
	'open',
	'depends',
	'strict',
	'banned',
	'unknown',
] as const;
const PLATFORM_KEYS = [
	'windows',
	'macos',
	'linux',
	'ios',
	'android',
	'web',
	'xbox',
	'playstation',
] as const;

const StarRatingSelector = ({
	value,
	onChange,
}: {
	value: number;
	onChange: (v: number) => void;
}) => {
	return (
		<div className='flex items-center gap-1'>
			{[1, 2, 3, 4, 5].map((star) => {
				const isFull = value >= star;
				const isHalf = value + 0.5 === star;
				return (
					<button
						key={star}
						type='button'
						onClick={() => onChange(star)}
						className='text-3xl leading-none text-muted-foreground hover:text-foreground transition-colors'
					>
						<span className='relative inline-block'>
							★
							{(isFull || isHalf) && (
								<span
									className='absolute left-0 top-0 text-foreground overflow-hidden'
									style={{ width: isFull ? '100%' : '50%' }}
								>
									★
								</span>
							)}
						</span>
					</button>
				);
			})}
			<span className='ml-4 font-mono text-sm tabular-nums text-muted-foreground'>
				{value.toFixed(1)}
			</span>
		</div>
	);
};

export default function AlternativesFilters({
	searchTerm,
	onSearchChange,
	sortBy,
	onSortChange,
	minRating,
	onMinRatingChange,
	minUsers,
	onMinUsersChange,
	openSourceOnly,
	onOpenSourceChange,
	decentralizedOnly,
	onDecentralizedChange,
	e2eeOnly,
	onE2eeChange,
	selectedNsfw,
	onNsfwToggle,
	selectedPlatforms,
	onPlatformToggle,
	onClearAll,
}: AlternativesFiltersProps) {
	const handleUsersInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value.replace(/[^0-9]/g, '');
		onMinUsersChange(raw);
	};

	const formattedUsers = minUsers
		? parseInt(minUsers).toLocaleString({useGrouping: true})
		: '10,000';

	return (
		<div className='space-y-10'>
			<Accordion
				type='multiple'
				defaultValue={['search-sort', 'rating-users']}
			>
				<AccordionItem value='search-sort'>
					<AccordionTrigger className='text-xs tracking-[1px] text-muted-foreground'>
						SEARCH &amp; SORT
					</AccordionTrigger>
					<AccordionContent className='space-y-6 pt-4'>
						<Input
							placeholder='Search alternatives...'
							value={searchTerm}
							onChange={(e) => onSearchChange(e.target.value)}
							className='text-base'
						/>

						<div className='w-full'>
							<div className='text-xs tracking-[1px] text-muted-foreground mb-2'>
								SORT BY
							</div>
							<Select
								value={sortBy}
								onValueChange={onSortChange}
							>
								<SelectTrigger className='w-full'>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='rating'>Highest rated</SelectItem>
									<SelectItem value='users'>Most users</SelectItem>
									<SelectItem value='features'>Most features</SelectItem>
									<SelectItem value='updated'>Recently updated</SelectItem>
									<SelectItem value='name'>A–Z</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value='rating-users'>
					<AccordionTrigger className='text-xs tracking-[1px] text-muted-foreground'>
						MINIMUMS
					</AccordionTrigger>
					<AccordionContent className='space-y-8 pt-4'>
						<div>
							<div className='text-xs tracking-[1px] text-muted-foreground mb-3'>
								MINIMUM RATING
							</div>
							<StarRatingSelector
								value={minRating}
								onChange={onMinRatingChange}
							/>
						</div>

						<div>
							<div className='text-xs tracking-[1px] text-muted-foreground mb-2'>
								MINIMUM USERS
							</div>
							<Input
								type='text'
								placeholder='10,000'
								value={formattedUsers}
								onChange={handleUsersInput}
								className='text-base font-mono'
							/>
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value='core'>
					<AccordionTrigger className='text-xs tracking-[1px] text-muted-foreground'>
						CORE REQUIREMENTS
					</AccordionTrigger>
					<AccordionContent className='pt-4 space-y-5'>
						<div className='flex items-center gap-3'>
							<Checkbox
								id='os'
								checked={openSourceOnly}
								onCheckedChange={onOpenSourceChange}
							/>
							<Label
								htmlFor='os'
								className='cursor-pointer'
							>
								Open source only
							</Label>
						</div>
						<div className='flex items-center gap-3'>
							<Checkbox
								id='dec'
								checked={decentralizedOnly}
								onCheckedChange={onDecentralizedChange}
							/>
							<Label
								htmlFor='dec'
								className='cursor-pointer'
							>
								Decentralized only
							</Label>
						</div>
						<div className='flex items-center gap-3'>
							<Checkbox
								id='e2ee'
								checked={e2eeOnly}
								onCheckedChange={onE2eeChange}
							/>
							<Label
								htmlFor='e2ee'
								className='cursor-pointer'
							>
								Has end-to-end encryption
							</Label>
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value='nsfw'>
					<AccordionTrigger className='text-xs tracking-[1px] text-muted-foreground'>
						NSFW POLICY
					</AccordionTrigger>
					<AccordionContent className='pt-4'>
						<div className='grid grid-cols-2 gap-3'>
							{NSFW_OPTIONS.map((status) => (
								<div
									key={status}
									className='flex items-center gap-2'
								>
									<Checkbox
										id={`nsfw-${status}`}
										checked={selectedNsfw.includes(status)}
										onCheckedChange={() => onNsfwToggle(status)}
									/>
									<Label
										htmlFor={`nsfw-${status}`}
										className='capitalize cursor-pointer text-sm'
									>
										{status}
									</Label>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value='platforms'>
					<AccordionTrigger className='text-xs tracking-[1px] text-muted-foreground'>
						PLATFORMS
					</AccordionTrigger>
					<AccordionContent className='pt-4'>
						<div className='grid grid-cols-2 gap-3'>
							{PLATFORM_KEYS.map((platform) => (
								<div
									key={platform}
									className='flex items-center gap-2'
								>
									<Checkbox
										id={platform}
										checked={selectedPlatforms.includes(platform)}
										onCheckedChange={() => onPlatformToggle(platform)}
									/>
									<Label
										htmlFor={platform}
										className='capitalize cursor-pointer text-sm'
									>
										{platform}
									</Label>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			<Button
				variant='outline'
				onClick={onClearAll}
				className='w-full py-5'
			>
				Clear all filters
			</Button>
		</div>
	);
}

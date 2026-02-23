'use client';

import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { TooltipProvider } from '@/components/ui/tooltip';

import AlternativesFilters from '@/components/AlternativesFilters';
import AlternativeCard from '@/components/AlternativeCard';
import AlternativeDetail from '@/components/AlternativeDetail';
import type { AlternativeLean } from '@/models/Alternative';

interface IAppsData {
	windows: { status: string };
	macos: { status: string };
	linux: { status: string };
	ios: { status: string };
	android: { status: string };
	web: { status: string };
	xbox: { status: string };
	playstation: { status: string };
}

interface IDiscordData {
	textChannels: { status: string };
	voiceChannels: { status: string };
	videoChannels: { status: string };
	customRoles: { status: string };
	permissionManagement: { status: string };
	customEmojis: { status: string };
	screenSharing: { status: string };
	privateMessages: { status: string };
}

const countDiscordFeatures = (discord: IDiscordData) =>
	Object.values(discord).filter((f) => f.status === 'available').length;

interface AlternativesClientProps {
	alternatives: AlternativeLean[];
	ratedMap: Map<string, boolean>;
}

export default function AlternativesClient({
	alternatives,
	ratedMap,
}: AlternativesClientProps) {
	const [selected, setSelected] = useState<AlternativeLean | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortBy, setSortBy] = useState<
		'rating' | 'users' | 'features' | 'name' | 'updated'
	>('rating');
	const [minRating, setMinRating] = useState(0);
	const [minUsers, setMinUsers] = useState('5000');
	const [openSourceOnly, setOpenSourceOnly] = useState(false);
	const [decentralizedOnly, setDecentralizedOnly] = useState(false);
	const [e2eeOnly, setE2eeOnly] = useState(false);
	const [selectedNsfw, setSelectedNsfw] = useState<string[]>([]);
	const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
	const [showFiltersSheet, setShowFiltersSheet] = useState(false);

	const filteredAndSorted = useMemo(() => {
		let result = [...alternatives];

		if (searchTerm.trim()) {
			const term = searchTerm.toLowerCase().trim();
			result = result.filter(
				(a) =>
					a.name.toLowerCase().includes(term) ||
					a.description.toLowerCase().includes(term),
			);
		}

		result = result.filter((alt) => {
			const ratingMatch = alt.data.users.rating >= minRating;
			const usersMatch =
				!minUsers || alt.data.users.amount >= parseInt(minUsers);
			const osMatch =
				!openSourceOnly || alt.data.openSource.status === 'available';
			const decMatch =
				!decentralizedOnly || alt.data.decentralization.status === 'available';
			const e2eeMatch =
				!e2eeOnly || alt.data.security.e2ee.status === 'available';
			const nsfwMatch =
				selectedNsfw.length === 0 ||
				selectedNsfw.includes(alt.data.nsfw.status);
			const platformMatch =
				selectedPlatforms.length === 0 ||
				selectedPlatforms.every(
					(p) => alt.data.apps[p as keyof IAppsData].status === 'available',
				);

			return (
				ratingMatch &&
				usersMatch &&
				osMatch &&
				decMatch &&
				e2eeMatch &&
				nsfwMatch &&
				platformMatch
			);
		});

		result.sort((a, b) => {
			switch (sortBy) {
				case 'name':
					return a.name.localeCompare(b.name);
				case 'users':
					return b.data.users.amount - a.data.users.amount;
				case 'features':
					return (
						countDiscordFeatures(b.data.discord as IDiscordData) -
						countDiscordFeatures(a.data.discord as IDiscordData)
					);
				case 'updated':
					return (
						new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
					);
				case 'rating':
				default:
					return b.data.users.rating - a.data.users.rating;
			}
		});

		return result;
	}, [
		alternatives,
		searchTerm,
		sortBy,
		minRating,
		minUsers,
		openSourceOnly,
		decentralizedOnly,
		e2eeOnly,
		selectedNsfw,
		selectedPlatforms,
	]);

	const clearAll = () => {
		setSearchTerm('');
		setSortBy('rating');
		setMinRating(0);
		setMinUsers('0');
		setOpenSourceOnly(false);
		setDecentralizedOnly(false);
		setE2eeOnly(false);
		setSelectedNsfw([]);
		setSelectedPlatforms([]);
	};

	const toggleNsfw = (s: string) =>
		setSelectedNsfw((prev) =>
			prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
		);

	const togglePlatform = (p: string) =>
		setSelectedPlatforms((prev) =>
			prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
		);

	const filterProps = {
		searchTerm,
		onSearchChange: setSearchTerm,
		sortBy,
		onSortChange: setSortBy,
		minRating,
		onMinRatingChange: setMinRating,
		minUsers,
		onMinUsersChange: setMinUsers,
		openSourceOnly,
		onOpenSourceChange: setOpenSourceOnly,
		decentralizedOnly,
		onDecentralizedChange: setDecentralizedOnly,
		e2eeOnly,
		onE2eeChange: setE2eeOnly,
		selectedNsfw,
		onNsfwToggle: toggleNsfw,
		selectedPlatforms,
		onPlatformToggle: togglePlatform,
		onClearAll: clearAll,
	};

	return (
		<TooltipProvider>
			<div className='min-h-screen bg-background'>
				<div className='max-w-7xl mx-auto px-6 py-12'>
					<div className='flex justify-between items-end mb-12'>
						<div>
							<h1 className='text-4xl font-medium tracking-tight'>
								Alternatives
							</h1>
							<p className='text-muted-foreground mt-1'>
								Discord alternatives comparison
							</p>
						</div>

						<Sheet
							open={showFiltersSheet}
							onOpenChange={setShowFiltersSheet}
						>
							<SheetTrigger asChild>
								<Button
									variant='outline'
									className='lg:hidden'
								>
									Filters
								</Button>
							</SheetTrigger>
							<SheetContent
								side='left'
								className='w-80 p-8 overflow-auto'
							>
								<SheetHeader>
									<SheetTitle>Filters</SheetTitle>
								</SheetHeader>
								<div className='mt-8'>
									<AlternativesFilters {...filterProps} />
								</div>
							</SheetContent>
						</Sheet>
					</div>

					<div className='flex flex-col lg:flex-row gap-10'>
						<div className='lg:w-80 flex-shrink-0 hidden lg:block'>
							<AlternativesFilters {...filterProps} />
						</div>

						<div className='flex-1'>
							<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
								{filteredAndSorted.length === 0 ? (
									<div className='col-span-full py-20 text-center text-muted-foreground text-lg'>
										No alternatives match your filters
									</div>
								) : (
									filteredAndSorted.map((alt) => (
										<AlternativeCard
											key={alt.name}
											alternative={alt}
											onShowDetails={setSelected}
										/>
									))
								)}
							</div>
						</div>
					</div>
				</div>

				<Dialog
					open={!!selected}
					onOpenChange={() => setSelected(null)}
				>
					<DialogContent className='!max-w-[95vw] w-[95vw] lg:!max-w-[40vw] lg:w-[40vw] h-[90vh] p-0 border-0 bg-transparent shadow-none overflow-hidden'>
						<DialogTitle className='sr-only'>
							{selected?.name ?? 'Alternative detail'}
						</DialogTitle>
						<div className='w-full h-full rounded-2xl bg-card border border-border overflow-hidden'>
							{selected && (
								<AlternativeDetail
									alternative={selected}
									isRated={ratedMap.get(selected._id.toString())}
									onClose={() => setSelected(null)}
								/>
							)}
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</TooltipProvider>
	);
}

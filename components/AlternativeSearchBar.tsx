'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { AlternativeLean } from '@/models/Alternative';

interface AlternativeSearchBarProps {
	alternatives: AlternativeLean[];
	selectedName: string;
	onSelect: (name: string) => void;
}

export function AlternativeSearchBar({
	alternatives,
	selectedName,
	onSelect,
}: AlternativeSearchBarProps) {
	const [searchTerm, setSearchTerm] = useState('');

	const filtered = useMemo(() => {
		if (!searchTerm.trim()) return [];
		const term = searchTerm.toLowerCase().trim();
		return alternatives
			.filter((alt) => alt.name.toLowerCase().includes(term))
			.slice(0, 10);
	}, [searchTerm, alternatives]);

	const selectedAlt = alternatives.find((a) => a.name === selectedName);

	return (
		<div className='flex flex-col items-center gap-4'>
			<div className='w-full max-w-md relative'>
				<Input
					type='text'
					placeholder='Search alternative by name...'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className='text-center h-11 text-base'
				/>

				{searchTerm && filtered.length > 0 && (
					<div className='absolute top-full left-0 right-0 mt-2 bg-popover border rounded-2xl shadow-xl z-50 max-h-72 overflow-auto py-2'>
						{filtered.map((alt) => (
							<button
								key={alt.name}
								type='button'
								onClick={() => {
									onSelect(alt.name);
									setSearchTerm('');
								}}
								className='w-full px-5 py-3 text-left hover:bg-accent flex items-center gap-3 text-sm border-b last:border-b-0'
							>
								{alt.image && (
									<img
										src={alt.image}
										alt={alt.name}
										className='w-8 h-8 rounded-full object-cover border'
									/>
								)}
								<span>{alt.name}</span>
							</button>
						))}
					</div>
				)}
			</div>

			{selectedAlt && (
				<div className='flex flex-col items-center gap-3'>
					{selectedAlt.image && (
						<div className='w-20 h-20 rounded-2xl overflow-hidden border-2 border-border'>
							<img
								src={selectedAlt.image}
								alt={selectedAlt.name}
								className='w-full h-full object-cover'
							/>
						</div>
					)}
					<div className='text-center'>
						<p className='text-xs text-muted-foreground'>Selected</p>
						<p className='font-semibold text-lg'>{selectedAlt.name}</p>
					</div>
				</div>
			)}
		</div>
	);
}

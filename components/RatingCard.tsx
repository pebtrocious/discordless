'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import TurnstileWidget from '@/components/TurnstileWidget';
import { submitRating } from '@/actions/submitRating';

const ratingSchema = z.object({
	rating: z.coerce
		.number()
		.int()
		.min(1, 'Rating must be at least 1')
		.max(5, 'Rating must be at most 5'),
});

type RatingFormValues = z.infer<typeof ratingSchema>;

interface RatingCardProps {
	alternativeId: string;
	onSuccess: () => void;
}

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

export default function RatingCard({
	alternativeId,
	onSuccess,
}: RatingCardProps) {
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);

	const form = useForm<RatingFormValues>({
		// resolver type mismatches are tricky due to zod defaults; cast to any
		resolver: zodResolver(ratingSchema) as any,
		defaultValues: {
			rating: 0,
		},
	});

	const handleSubmit = async (values: RatingFormValues) => {
		if (!token) {
			setServerError('Please complete the security check');
			return;
		}
		setIsLoading(true);
		setServerError(null);
		try {
			const result = await submitRating(alternativeId, values.rating, token);
			if (result.success) {
				onSuccess();
			} else {
				setServerError(result.error || 'Error submitting rating');
			}
		} catch (err) {
			setServerError('Error submitting rating');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='space-y-4'
			>
				<FormField
					control={form.control}
					name='rating'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rating (1-5)</FormLabel>
							<FormControl>
								<div className='flex justify-center'>
									<StarRatingSelector
										value={field.value}
										onChange={field.onChange}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<TurnstileWidget
					key={`turnstile-${alternativeId}`}
					setToken={setToken}
				/>

				{serverError && <p className='text-rose-500 text-sm'>{serverError}</p>}

				<Button
					type='submit'
					className='w-full'
					disabled={isLoading || !token}
				>
					{isLoading ? 'Submitting...' : 'Submit Rating'}
				</Button>
			</form>
		</Form>
	);
}

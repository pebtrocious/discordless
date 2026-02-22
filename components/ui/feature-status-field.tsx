import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FormSectionCard } from '@/components/ui/form-section-card';
import { Control } from 'react-hook-form';

interface FeatureStatusFieldProps {
	control: Control<any>;
	namePrefix: string;
	label: string;
}

export function FeatureStatusField({
	control,
	namePrefix,
	label,
}: FeatureStatusFieldProps) {
	const statuses = [
		{ value: 'available', label: 'Available' },
		{ value: 'development', label: 'In Development' },
		{ value: 'missing', label: 'Missing' },
		{ value: 'unknown', label: 'Unknown' },
	] as const;

	return (
		<FormSectionCard title={label}>
			<FormField
				control={control}
				name={`${namePrefix}.status`}
				render={({ field }) => (
					<FormItem>
						<div className='flex flex-wrap gap-2'>
							{statuses.map((status) => (
								<Button
									key={status.value}
									type='button'
									variant={field.value === status.value ? 'default' : 'outline'}
									onClick={() => field.onChange(status.value)}
									className='capitalize min-w-[130px] flex-1 md:flex-none transition-all'
								>
									{status.label}
								</Button>
							))}
						</div>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={control}
				name={`${namePrefix}.note`}
				render={({ field }) => (
					<FormItem>
						<FormLabel className='text-sm text-muted-foreground'>
							Note
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder='Optional additional context...'
								className='min-h-[70px] resize-y'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</FormSectionCard>
	);
}

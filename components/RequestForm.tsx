'use client';
import type { FieldPath } from 'react-hook-form';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	alternativeFormSchema,
	type AlternativeFormValues,
} from '@/lib/validations/alternative';
import { useState, useEffect, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { FeatureStatusField } from '@/components/ui/feature-status-field';
import { Progress } from '@/components/ui/progress';
import { FormSectionCard } from '@/components/ui/form-section-card';
import { AlternativeSearchBar } from '@/components/AlternativeSearchBar';
import TurnstileWidget from '@/components/TurnstileWidget';

import type { AlternativeLean } from '@/models/Alternative';

const defaultFormValues: AlternativeFormValues = {
	name: '',
	description: '',
	image: '',
	website: '',
	data: {
		pros: [],
		cons: [],
		warnings: [],
		discord: {
			textChannels: { status: undefined, note: '' },
			voiceChannels: { status: undefined, note: '' },
			videoChannels: { status: undefined, note: '' },
			customRoles: { status: undefined, note: '' },
			permissionManagement: { status: undefined, note: '' },
			customEmojis: { status: undefined, note: '' },
			screenSharing: { status: undefined, note: '' },
			privateMessages: { status: undefined, note: '' },
		},
		security: { e2ee: { status: undefined, note: '' }, dataCollection: '' },
		openSource: { status: undefined, note: '', repository: '' },
		users: { amount: 0 },
		decentralization: { status: undefined, note: '' },
		country: { flag: '', name: 'Unknown', note: '' },
		nsfw: { status: undefined, note: '' },
		ai: { text: '' },
		apps: {
			windows: { status: undefined, note: '' },
			macos: { status: undefined, note: '' },
			linux: { status: undefined, note: '' },
			ios: { status: undefined, note: '' },
			android: { status: undefined, note: '' },
			web: { status: undefined, note: '' },
			xbox: { status: undefined, note: '' },
			playstation: { status: undefined, note: '' },
		},
	},
};

const steps = [
	{ id: 1, title: 'Basic Information' },
	{ id: 2, title: 'Pros, Cons & Warnings' },
	{ id: 3, title: 'Discord-like Features' },
	{ id: 4, title: 'Security' },
	{ id: 5, title: 'Open Source' },
	{ id: 6, title: 'Userbase' },
	{ id: 7, title: 'Decentralization' },
	{ id: 8, title: 'Country / Jurisdiction' },
	{ id: 9, title: 'NSFW Policy' },
	{ id: 10, title: 'AI Policies' },
	{ id: 11, title: 'Available Platforms' },
	{ id: 12, title: 'Review & Submit' },
];

interface RequestFormProps {
	alternatives: AlternativeLean[];
	submitAction: (
		mode: 'create' | 'update',
		values: AlternativeFormValues,
		turnstileToken: string,
	) => Promise<{ success: boolean; message: string }>;
}

export default function RequestForm({
	alternatives,
	submitAction,
}: RequestFormProps) {
	const [currentStep, setCurrentStep] = useState(1);
	const [mode, setMode] = useState<'create' | 'update'>('create');
	const [selectedName, setSelectedName] = useState('');
	const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<AlternativeFormValues>({
		// resolver type mismatches are tricky due to zod defaults; cast to any
		resolver: zodResolver(alternativeFormSchema) as any,
		defaultValues: defaultFormValues,
	});

	const resetForm = useCallback(() => {
		form.reset(defaultFormValues);
		setSelectedName('');
		setTurnstileToken(null);
		setCurrentStep(1);
	}, [form]);

	useEffect(() => {
		resetForm();
	}, [mode, resetForm]);

	useEffect(() => {
		if (mode === 'update' && selectedName) {
			const alt = alternatives.find((a) => a.name === selectedName);
			if (alt) {
				form.reset({
					name: alt.name,
					description: alt.description ?? '',
					image: alt.image ?? '',
					website: alt.website ?? '',
					data: {
						pros: alt.data.pros ?? [],
						cons: alt.data.cons ?? [],
						warnings: alt.data.warnings ?? [],
						discord: alt.data.discord ?? defaultFormValues.data.discord,
						security: alt.data.security ?? defaultFormValues.data.security,
						openSource:
							alt.data.openSource ?? defaultFormValues.data.openSource,
						users: { amount: alt.data.users?.amount ?? 0 },
						decentralization:
							alt.data.decentralization ??
							defaultFormValues.data.decentralization,
						country: alt.data.country ?? defaultFormValues.data.country,
						nsfw: alt.data.nsfw ?? defaultFormValues.data.nsfw,
						ai: alt.data.ai ?? defaultFormValues.data.ai,
						apps: alt.data.apps ?? defaultFormValues.data.apps,
					},
				});
				setCurrentStep(1);
			}
		}
	}, [selectedName, mode, alternatives, form]);

	const prosArray = useFieldArray({ control: form.control, name: 'data.pros' });
	const consArray = useFieldArray({ control: form.control, name: 'data.cons' });
	const warningsArray = useFieldArray({
		control: form.control,
		name: 'data.warnings',
	});

	const getStepFields = (step: number): FieldPath<AlternativeFormValues>[] => {
		switch (step) {
			case 1:
				return ['name', 'description'];
			case 3:
				return Object.keys(defaultFormValues.data.discord).map(
					(key) =>
						`data.discord.${key}.status` as FieldPath<AlternativeFormValues>,
				);
			case 4:
				return ['data.security.e2ee.status'];
			case 5:
				return ['data.openSource.status'];
			case 7:
				return ['data.decentralization.status'];
			case 9:
				return ['data.nsfw.status'];
			case 11:
				return Object.keys(defaultFormValues.data.apps).map(
					(key) =>
						`data.apps.${key}.status` as FieldPath<AlternativeFormValues>,
				);
			default:
				return [];
		}
	};

	const nextStep = async () => {
		const fields = getStepFields(currentStep);
		const isValid = await form.trigger(fields);
		if (isValid && currentStep < steps.length) {
			setCurrentStep(currentStep + 1);
		}
	};

	const prevStep = () => {
		if (currentStep > 1) setCurrentStep(currentStep - 1);
	};

	const handleSubmit = async (values: AlternativeFormValues) => {
		if (!turnstileToken) {
			alert('Please complete the security check');
			return;
		}
		setIsLoading(true);
		try {
			const result = await submitAction(mode, values, turnstileToken);
			alert(result.message);
			if (result.success) resetForm();
		} catch (err) {
			alert('Error submitting form');
		} finally {
			setIsLoading(false);
		}
	};

	const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='max-w-3xl mx-auto space-y-12'
			>
				{/* Mode selector */}
				<div className='flex justify-center'>
					<div className='inline-flex rounded-full bg-muted p-1'>
						<button
							type='button'
							onClick={() => setMode('create')}
							className={`rounded-full px-8 py-2 text-sm font-medium transition-all ${mode === 'create' ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
						>
							Add New
						</button>
						<button
							type='button'
							onClick={() => setMode('update')}
							className={`rounded-full px-8 py-2 text-sm font-medium transition-all ${mode === 'update' ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
						>
							Update Existing
						</button>
					</div>
				</div>

				{/* Search bar */}
				{mode === 'update' && (
					<AlternativeSearchBar
						alternatives={alternatives}
						selectedName={selectedName}
						onSelect={setSelectedName}
					/>
				)}

				{/* Centered section title */}
				<div className='text-center'>
					<h2 className='text-3xl font-semibold tracking-tight'>
						{steps[currentStep - 1].title}
					</h2>
				</div>

				{/* Progress */}
				<div className='space-y-2'>
					<div className='flex justify-between text-sm text-muted-foreground'>
						<span>
							Step {currentStep} of {steps.length}
						</span>
					</div>
					<Progress
						value={progress}
						className='h-1.5'
					/>
				</div>

				<div className='min-h-[420px]'>
					{currentStep === 1 && (
						<FormSectionCard title='Basic Information'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={mode === 'update'}
												placeholder='Discord'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												placeholder='Privacy-focused messaging app...'
												className='min-h-24'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<FormField
									control={form.control}
									name='image'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Image URL</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='https://example.com/logo.png'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='website'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Website</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='https://example.com'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</FormSectionCard>
					)}

					{currentStep === 2 && (
						<div className='space-y-10'>
							{[
								{
									label: 'Pros',
									array: prosArray,
									fieldName: 'data.pros' as const,
								},
								{
									label: 'Cons',
									array: consArray,
									fieldName: 'data.cons' as const,
								},
								{
									label: 'Warnings',
									array: warningsArray,
									fieldName: 'data.warnings' as const,
								},
							].map(({ label, array, fieldName }) => (
								<div key={label}>
									<div className='mb-4 flex items-center justify-between'>
										<h3 className='text-lg font-medium'>{label}</h3>
										<Button
											type='button'
											variant='outline'
											size='sm'
											onClick={() => array.append({ text: '', note: '' })}
										>
											Add
										</Button>
									</div>
									<div className='space-y-4'>
										{array.fields.map((field, index) => (
											<div
												key={field.id}
												className='flex flex-col gap-3 rounded-lg border p-5 md:flex-row md:items-end'
											>
												<div className='flex-1 space-y-3'>
													<FormField
														control={form.control}
														name={`${fieldName}.${index}.text`}
														render={({ field: f }) => (
															<FormItem>
																<FormLabel>Text</FormLabel>
																<FormControl>
																	<Input {...f} />
																</FormControl>
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name={`${fieldName}.${index}.note`}
														render={({ field: f }) => (
															<FormItem>
																<FormLabel>Note</FormLabel>
																<FormControl>
																	<Textarea {...f} />
																</FormControl>
															</FormItem>
														)}
													/>
												</div>
												<Button
													type='button'
													variant='destructive'
													size='sm'
													onClick={() => array.remove(index)}
												>
													Remove
												</Button>
											</div>
										))}
									</div>
									<Separator className='my-8' />
								</div>
							))}
						</div>
					)}

					{currentStep === 3 && (
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
							<FeatureStatusField
								control={form.control}
								namePrefix='data.discord.textChannels'
								label='Text Channels'
							/>
							<FeatureStatusField
								control={form.control}
								namePrefix='data.discord.voiceChannels'
								label='Voice Channels'
							/>
							<FeatureStatusField
								control={form.control}
								namePrefix='data.discord.videoChannels'
								label='Video Channels'
							/>
							<FeatureStatusField
								control={form.control}
								namePrefix='data.discord.customRoles'
								label='Custom Roles'
							/>
							<FeatureStatusField
								control={form.control}
								namePrefix='data.discord.permissionManagement'
								label='Permission Management'
							/>
							<FeatureStatusField
								control={form.control}
								namePrefix='data.discord.customEmojis'
								label='Custom Emojis'
							/>
							<FeatureStatusField
								control={form.control}
								namePrefix='data.discord.screenSharing'
								label='Screen Sharing'
							/>
							<FeatureStatusField
								control={form.control}
								namePrefix='data.discord.privateMessages'
								label='Private Messages'
							/>
						</div>
					)}

					{currentStep === 4 && (
						<div className='space-y-8'>
							<FeatureStatusField
								control={form.control}
								namePrefix='data.security.e2ee'
								label='End-to-End Encryption'
							/>
							<FormSectionCard title='Data Collection Policy'>
								<FormField
									control={form.control}
									name='data.security.dataCollection'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Textarea
													{...field}
													placeholder='What data is collected...'
													className='min-h-28'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</FormSectionCard>
						</div>
					)}

					{currentStep === 5 && (
						<FormSectionCard title='Open Source Status'>
							<FormField
								control={form.control}
								name='data.openSource.status'
								render={({ field }) => (
									<FormItem>
										<div className='flex flex-wrap gap-2'>
											{['available', 'development', 'missing', 'unknown'].map(
												(status) => (
													<Button
														key={status}
														type='button'
														variant={
															field.value === status && status !== undefined
																? 'default'
																: 'outline'
														}
														onClick={() => field.onChange(status)}
														className='capitalize min-w-[130px]'
													>
														{status === 'development'
															? 'In Development'
															: status.charAt(0).toUpperCase() +
																status.slice(1)}
													</Button>
												),
											)}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='data.openSource.note'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Note</FormLabel>
										<FormControl>
											<Textarea {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='data.openSource.repository'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Repository URL</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder='https://github.com/...'
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</FormSectionCard>
					)}

					{currentStep === 6 && (
						<FormSectionCard title='Userbase'>
							<FormField
								control={form.control}
								name='data.users.amount'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Monthly Active Users</FormLabel>
										<FormControl>
											<Input
												type='number'
												{...field}
												placeholder='1,250,000'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormSectionCard>
					)}

					{currentStep === 7 && (
						<FeatureStatusField
							control={form.control}
							namePrefix='data.decentralization'
							label='Decentralization Status'
						/>
					)}

					{currentStep === 8 && (
						<FormSectionCard title='Origin / Jurisdiction'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<FormField
									control={form.control}
									name='data.country.flag'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Flag (emoji or code)</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='🇺🇸'
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='data.country.name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Country Name</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='United States'
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name='data.country.note'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Note</FormLabel>
										<FormControl>
											<Textarea {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</FormSectionCard>
					)}

					{currentStep === 9 && (
						<FormSectionCard title='NSFW Status'>
							<FormField
								control={form.control}
								name='data.nsfw.status'
								render={({ field }) => (
									<FormItem>
										<div className='flex flex-wrap gap-2'>
											{['open', 'depends', 'strict', 'banned', 'unknown'].map(
												(status) => (
													<Button
														key={status}
														type='button'
														variant={
															field.value === status && status !== undefined
																? 'default'
																: 'outline'
														}
														onClick={() => field.onChange(status)}
														className='capitalize min-w-[110px]'
													>
														{status.charAt(0).toUpperCase() + status.slice(1)}
													</Button>
												),
											)}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='data.nsfw.note'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Note</FormLabel>
										<FormControl>
											<Textarea {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</FormSectionCard>
					)}

					{currentStep === 10 && (
						<FormSectionCard title='AI Policies'>
							<FormField
								control={form.control}
								name='data.ai.text'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea
												{...field}
												placeholder='Does the company train on user messages? Any generative AI features? ...'
												className='min-h-32'
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</FormSectionCard>
					)}

					{currentStep === 11 && (
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
							<FeatureStatusField
								control={form.control}
								namePrefix='data.apps.windows'
								label='Windows'
							/>
							<FeatureStatusField
								control={form.control}
								namePrefix='data.apps.macos'
								label='macOS'
							/>
							<FeatureStatusField
								control={form.control}
								namePrefix='data.apps.linux'
								label='Linux'
							/>
							<FeatureStatusField
								control={form.control}
								namePrefix='data.apps.ios'
								label='iOS'
							/>
							<FeatureStatusField
								control={form.control}
								namePrefix='data.apps.android'
								label='Android'
							/>
							<FeatureStatusField
								control={form.control}
								namePrefix='data.apps.web'
								label='Web'
							/>
							<FeatureStatusField
								control={form.control}
								namePrefix='data.apps.xbox'
								label='Xbox'
							/>
							<FeatureStatusField
								control={form.control}
								namePrefix='data.apps.playstation'
								label='PlayStation'
							/>
						</div>
					)}

					{currentStep === 12 && (
						<div>
							<p className='text-muted-foreground mb-8'>
								Please review everything before submitting.
							</p>

							<div className='space-y-8'>
								<FormSectionCard title='Basic Information'>
									<div className='space-y-2 text-sm'>
										<p>
											<strong>Name:</strong> {form.getValues('name') || '—'}
										</p>
										<p>
											<strong>Description:</strong>{' '}
											{form.getValues('description') || '—'}
										</p>
										<p>
											<strong>Image URL:</strong>{' '}
											{form.getValues('image') || '—'}
										</p>
										<p>
											<strong>Website:</strong>{' '}
											{form.getValues('website') || '—'}
										</p>
									</div>
								</FormSectionCard>

								<FormSectionCard title='Pros, Cons & Warnings'>
									<div className='space-y-4 text-sm'>
										<p>
											<strong>Pros:</strong>{' '}
											{form.getValues('data.pros').length}
										</p>
										<p>
											<strong>Cons:</strong>{' '}
											{form.getValues('data.cons').length}
										</p>
										<p>
											<strong>Warnings:</strong>{' '}
											{form.getValues('data.warnings').length}
										</p>
									</div>
								</FormSectionCard>

								<FormSectionCard title='Key Status Fields'>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
										<p>
											<strong>End-to-End Encryption:</strong>{' '}
											{form.getValues('data.security.e2ee.status') ||
												'unselected'}
										</p>
										<p>
											<strong>Open Source:</strong>{' '}
											{form.getValues('data.openSource.status') || 'unselected'}
										</p>
										<p>
											<strong>Decentralization:</strong>{' '}
											{form.getValues('data.decentralization.status') ||
												'unselected'}
										</p>
										<p>
											<strong>NSFW:</strong>{' '}
											{form.getValues('data.nsfw.status') || 'unselected'}
										</p>
									</div>
								</FormSectionCard>

								<FormSectionCard title='Other Fields'>
									<div className='space-y-2 text-sm'>
										<p>
											<strong>Monthly Active Users:</strong>{' '}
											{form.getValues('data.users.amount')}
										</p>
										<p>
											<strong>AI Policies:</strong>{' '}
											{form.getValues('data.ai.text') || '—'}
										</p>
										<p>
											<strong>Data Collection:</strong>{' '}
											{form.getValues('data.security.dataCollection') || '—'}
										</p>
									</div>
								</FormSectionCard>
							</div>

							<TurnstileWidget
								key={`turnstile-${currentStep}`}
								setToken={setTurnstileToken}
							/>
						</div>
					)}
				</div>

				<div className='flex justify-between items-center pt-8 border-t'>
					<Button
						type='button'
						variant='outline'
						onClick={prevStep}
						disabled={currentStep === 1}
					>
						Previous
					</Button>

					<Button
						type='button'
						variant='outline'
						onClick={resetForm}
					>
						Clear Form
					</Button>

					{currentStep < steps.length && (
						<Button
							type='button'
							onClick={nextStep}
						>
							Next
						</Button>
					)}
					{currentStep === steps.length && (
						<Button
							type='submit'
							size='lg'
							disabled={isLoading || !turnstileToken}
						>
							{isLoading ? 'Submitting...' : 'Submit'}
						</Button>
					)}
				</div>
			</form>
		</Form>
	);
}

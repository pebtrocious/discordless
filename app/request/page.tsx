export const dynamic = 'force-dynamic';

import Alternative from '@/models/Alternative';
import Request from '@/models/Request';
import type { AlternativeLean } from '@/models/Alternative';
import { revalidatePath } from 'next/cache';
import { AlternativeFormValues } from '@/lib/validations/alternative';
import RequestForm from '@/components/RequestForm';

async function submitAlternative(
	mode: 'create' | 'update',
	values: AlternativeFormValues,
	turnstileToken: string,
) {
	'use server';

	if (!turnstileToken) {
		return { success: false, message: 'Please complete the security check' };
	}

	const verifyResponse = await fetch(
		'https://challenges.cloudflare.com/turnstile/v0/siteverify',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				secret: process.env.TURNSTILE_SECRET_KEY,
				response: turnstileToken,
				remoteip: null,
			}),
		},
	);

	const verifyData = await verifyResponse.json();

	if (!verifyData.success) {
		return {
			success: false,
			message: 'Security check failed. Please try again.',
		};
	}

	try {
		await new Request({
			type: mode,
			alternative: {
				name: values.name,
				description: values.description ?? '',
				image: values.image ?? '',
				website: values.website ?? '',
				recommend: 0,
				data: values.data,
			},
		}).save();

		revalidatePath('/request');

		return {
			success: true,
			message: `Your request to ${mode} "${values.name}" has been submitted successfully!`,
		};
	} catch (error) {
		console.error('Request submission error:', error);
		return {
			success: false,
			message: 'Failed to submit request. Please try again later.',
		};
	}
}

export default async function SubmitAlternativePage() {
	const rawAlternatives = await Alternative.find({}).sort({ name: 1 }).lean();
	const alternatives = JSON.parse(
		JSON.stringify(rawAlternatives),
	) as AlternativeLean[];

	return (
		<div className='min-h-screen bg-background py-12'>
			<div className='container max-w-4xl mx-auto px-6'>
				<div>
					<RequestForm
						alternatives={alternatives}
						submitAction={submitAlternative}
					/>
				</div>
			</div>
		</div>
	);
}

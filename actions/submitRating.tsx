// app/alternatives/actions.ts (Updated Server Action)
'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import Alternative from '@/models/Alternative';

export async function submitRating(
	alternativeId: string,
	rating: number,
	turnstileToken: string,
) {
	const cookieStore = await cookies();

	const hasRated = cookieStore.has(`rated_${alternativeId}`);
	if (hasRated) {
		return { success: false, error: 'You have already rated this alternative' };
	}

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

	const alternative = await Alternative.findById(alternativeId);
	if (!alternative) {
		return { success: false, error: 'Alternative not found' };
	}

	const users = alternative.data.users;
	users.ratingsCount += 1;
	users.ratingSum += rating;
	users.rating = users.ratingSum / users.ratingsCount;

	await alternative.save();

	// Set cookie to prevent future ratings
	cookieStore.set(`rated_${alternativeId}`, 'true', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 365,
	});

	// Revalidate to update UI (hide button, update averages if DB used)
	revalidatePath('/alternatives');

	return { success: true };
}

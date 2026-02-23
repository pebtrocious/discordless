export const dynamic = 'force-dynamic';

import Alternative from '@/models/Alternative';
import type { AlternativeLean } from '@/models/Alternative';
import AlternativesClient from './client';
import { cookies } from 'next/headers';

export default async function AlternativesPage() {
	const rawAlternatives = await Alternative.find({}).sort({ name: 1 }).lean();
	const alternatives = JSON.parse(
		JSON.stringify(rawAlternatives),
	) as AlternativeLean[];
	const cookieStore = await cookies();
	const ratedMap: Map<string, boolean> = new Map(
		alternatives.map((alt) => [
			alt._id.toString(),
			cookieStore.has(`rated_${alt._id}`),
		]),
	);

	return (
		<AlternativesClient
			alternatives={alternatives}
			ratedMap={ratedMap}
		/>
	);
}

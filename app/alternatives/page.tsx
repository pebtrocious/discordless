export const dynamic = 'force-dynamic';

import Alternative from '@/models/Alternative';
import type { AlternativeLean } from '@/models/Alternative';
import AlternativesClient from './client';

export default async function AlternativesPage() {
	const rawAlternatives = await Alternative.find({}).sort({ name: 1 }).lean();
	const alternatives = JSON.parse(
		JSON.stringify(rawAlternatives),
	) as AlternativeLean[];

	return <AlternativesClient alternatives={alternatives} />;
}

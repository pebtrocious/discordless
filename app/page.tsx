export const dynamic = 'force-dynamic';
import FAQSection from '@/components/FAQSection';
import FeaturesSection from '@/components/FeaturesSection';
import Hero from '@/components/Hero';
import LeaderboardSection from '@/components/LeaderboardSection';

export default function Home() {
	return (
		<main>
			<Hero />
			<LeaderboardSection />
			<FeaturesSection />
			<FAQSection />
		</main>
	);
}

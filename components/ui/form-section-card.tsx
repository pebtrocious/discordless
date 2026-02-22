import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';

interface FormSectionCardProps {
	title: string;
	children: ReactNode;
}

export function FormSectionCard({ title, children }: FormSectionCardProps) {
	return (
		<Card className='rounded-2xl'>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent className='p-8 pt-0 space-y-6'>{children}</CardContent>
		</Card>
	);
}

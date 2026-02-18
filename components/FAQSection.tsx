import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
	{
		question: 'What is the best alternative?',
		answer: `There's no "best" alternative at the moment, each one has pros and cons. But if you would ask me, I would choose open source and decentralized solutions`,
	},
	{
		question: 'Information is outdated what should I do?',
		answer: 'Send a request through request subpage',
	},
	{
		question: 'Why being against ID verification?',
		answer: `Short answer is that it's not about kids. It's about your personal data`,
	},
	{
		question: `Discord isn't the issue, government is`,
		answer: `Yes that's correct, Discord is not the main culprit here, and other centralized apps will face the same fate as Discord, that's why I advocate for decentralized open source solutions`,
	},
	{
		question: `I thought this website was supposed to be unbiased?`,
		answer: `At it's core it is, I list every alternative there is with community based feedback, but all sorts of recommendations are my based on my opinions`,
	},
	{
		question: `Is this website vibecoded?`,
		answer: `First version was indeed vibecoded because I didn't think it would get so much attention. This version is 100% AI free. Feel free to contribute on github`,
	},
	{
		question: `Can I put my app here?`,
		answer: `You can request adding your app here if it isn't available yet, but beware that very small projects that came out of literally nowhere will be less visible due to lack of trust`,
	},
];

export default function FAQSection() {
	return (
		<section className='py-8 sm:py-16 lg:py-24'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
					<h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
						Have any questions? Good, as you should
					</h2>
					<p className='text-muted-foreground text-xl'>
						Here is a list of common questions I was asked
					</p>
				</div>

				<Accordion
					type='single'
					collapsible
					className='w-full'
					defaultValue='item-1'
				>
					{faqItems.map((item, index) => (
						<AccordionItem
							key={index}
							value={`item-${index + 1}`}
						>
							<AccordionTrigger className='text-lg'>
								{item.question}
							</AccordionTrigger>
							<AccordionContent className='text-muted-foreground'>
								{item.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}

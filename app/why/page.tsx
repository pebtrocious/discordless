/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const sections = [
	{ id: 'why-discord', label: 'Why Discord is Implementing ID Verification' },
	{ id: 'privacy-risks', label: 'Why This Is a Privacy Nightmare' },
	{ id: 'not-about-children', label: 'It’s Not About Protecting Children' },
	{ id: 'free-speech', label: 'A Serious Threat to Free Speech' },
	{ id: 'how-to-fight', label: 'How to Battle Against It' },
	{ id: 'take-action', label: 'Take Action Sign Every Petition' },
];

export default function DiscordIDVerificationPage() {
	const [activeSection, setActiveSection] = useState('why-discord');

	const renderContent = () => {
		switch (activeSection) {
			case 'why-discord':
				return (
					<div className='space-y-12 max-w-prose'>
						<div>
							<h2 className='text-3xl font-medium tracking-tight mb-8 text-foreground'>
								Why Discord is Implementing ID Verification
							</h2>
							<p className='text-xl text-destructive font-medium'>
								This is not a “safety update.” This is a disgusting betrayal of
								every user who trusted Discord.
							</p>
						</div>

						<div className='space-y-8 text-foreground'>
							<p>
								Governments worldwide are ramming through laws that force
								platforms to demand government IDs or facial scans. The UK
								Online Safety Act, Australia harsh restrictions, multiple US
								state laws, and EU rules all demand the same thing: turn every
								platform into an extension of state surveillance.
							</p>
							<p>
								Discord could have fought this. They could have joined lawsuits,
								spoken out publicly, or delayed until the last possible second.
								Instead, they announced the global rollout in February 2026 and
								will start enforcing it in March faster than almost anyone else.
							</p>
							<div className='pt-8 border-t border-border'>
								<p className='font-medium text-destructive'>
									And here's the part that should make you furious: Discord
									confidentially filed for its IPO in January 2026. They are
									desperate to look “responsible” and “pro-children” to Wall
									Street investors.
								</p>
								<p className='mt-4'>
									Protecting your privacy clearly means less to them than
									getting that stock ticker. This is corporate greed at its most
									blatant selling out millions of users for a better valuation.
								</p>
							</div>
						</div>
					</div>
				);

			case 'privacy-risks':
				return (
					<div className='space-y-12 max-w-prose'>
						<div>
							<h2 className='text-3xl font-medium tracking-tight mb-8 text-foreground'>
								Why This Is a Privacy Nightmare
							</h2>
							<p className='text-xl text-destructive font-medium'>
								Once your real identity is linked to your account, there is no
								going back ever.
							</p>
						</div>

						<div className='space-y-10 text-foreground'>
							<div className='pl-6 border-l-4 border-destructive'>
								<p className='font-medium text-lg'>
									Just two days ago (February 20, 2026), Discord's chosen UK
									age-verification partner Persona left its entire frontend
									codebase exposed on the open internet.
								</p>
								<p className='text-sm text-muted-foreground mt-3'>
									Researchers found surveillance tools, watchlists, financial
									screening, and deep government integration features. Read the
									shocking report{' '}
									<a
										href='https://www.therage.co/persona-age-verification/'
										target='_blank'
										rel='noopener noreferrer'
										className='underline hover:text-destructive'
									>
										here
									</a>
									.
								</p>
							</div>

							<div className='pl-6 border-l-4 border-destructive'>
								<p className='font-medium text-lg'>
									Discord itself suffered a catastrophic breach in 2025 that
									exposed 70,000 government IDs and selfies.
								</p>
								<p className='text-sm text-muted-foreground mt-3'>
									They still learned nothing. Now they want even more of your
									most sensitive data.
								</p>
							</div>

							<div className='pt-8 border-t border-border'>
								<p className='text-destructive font-medium'>
									Do not trust Discord or any social media platform with your
									government ID or face scan. They have repeatedly proven they
									cannot keep it safe, and they never will.
								</p>
							</div>

							<p>
								Every time you verify, you hand over irreplaceable biometric
								data to companies that treat your privacy as an afterthought.
								This is not a minor inconvenience. This is the end of anonymous
								online life as we know it.
							</p>
						</div>
					</div>
				);

			case 'not-about-children':
				return (
					<div className='space-y-12 max-w-prose'>
						<div>
							<h2 className='text-3xl font-medium tracking-tight mb-8 text-foreground'>
								It's Not About Protecting Children
							</h2>
							<p className='text-2xl text-destructive font-medium'>
								We are not angry enough about this. Not even close.
							</p>
						</div>

						<div className='space-y-8 text-foreground'>
							<p>
								This is mass surveillance sold to us as child protection.
								Parents already have effective, free tools that do exactly what
								ID verification claims to do: block specific sites and apps for
								their kids.
							</p>

							<p>
								Forcing every single adult on the entire internet to prove who
								they are to a third-party company is not parenting. It is
								governments and corporations building a permanent record of who
								uses what online and they are using children as the excuse.
							</p>

							<div className='pt-8 border-t border-border bg-destructive/5 p-8 rounded-lg'>
								<p className='font-medium text-destructive'>
									We should be furious. This is not about keeping kids safe.
									This is about control, data collection, and power. Full stop.
								</p>
							</div>

							<p>
								The fact that we are letting them get away with this under the
								banner of “think of the children” is one of the biggest cons in
								internet history. Enough is enough.
							</p>
						</div>
					</div>
				);

			case 'free-speech':
				return (
					<div className='space-y-12 max-w-prose'>
						<div>
							<h2 className='text-3xl font-medium tracking-tight mb-8 text-foreground'>
								A Serious Threat to Free Speech
							</h2>
							<div className='border-l-4 border-destructive pl-6 py-2'>
								<p className='text-xl font-medium text-foreground'>
									Anyone with an opinion that harms the current government will
									be silenced.
								</p>
								<p className='text-foreground mt-4'>
									This includes every government left, right, or center. No
									exceptions.
								</p>
							</div>
						</div>

						<div className='space-y-8 text-foreground'>
							<p>
								In the UK, police have made over 12,000 arrests for social media
								posts in a single year often treating online speech as more
								urgent than many real-world crimes.
							</p>

							<p>
								Right now in the US, ICE and DHS are showing up at protesters
								homes and issuing subpoenas to unmask anonymous critics online.
								Whether you're protesting from the left or the right, once
								platforms know exactly who you are, your ability to speak freely
								disappears.
							</p>
						</div>
					</div>
				);

			case 'how-to-fight':
				return (
					<div className='space-y-12 max-w-prose'>
						<div>
							<h2 className='text-3xl font-medium tracking-tight mb-8 text-foreground'>
								How to Battle Against It
							</h2>
						</div>

						<div className='space-y-10 text-foreground'>
							<div>
								<h3 className='font-medium mb-4 text-lg text-destructive'>
									Immediate actions you can take today
								</h3>
								<ul className='space-y-4 text-sm pl-2'>
									<li className='flex items-start gap-3'>
										Cancel your Discord nitro, server boosts, stop doing quests,
										those are 3 main revenue streams for Discord
									</li>
									<li className='flex items-start gap-3'>
										Export and permanently wipe every piece of your data
									</li>
									<li className='flex items-start gap-3'>
										Move every single community you care about off this sinking
										ship
									</li>
								</ul>
							</div>

							<div className='pt-8 border-t border-border'>
								<p className='text-xl font-medium text-destructive mb-4'>
									The only real, lasting solution is to decentralize everything.
								</p>
								<p>
									Centralized platforms will always cave to governments and
									investors. They cannot be trusted. Switch to Matrix,
									TeamSpeak, or anything that let's anyone run their own server.
									Build and support systems that are structurally impossible to
									force into mass ID collection.
								</p>
							</div>

							<div>
								<h3 className='font-medium mb-4 text-lg'>
									Long-term resistance
								</h3>
								<ul className='space-y-4 text-sm pl-2'>
									<li className='flex items-start gap-3'>
										• Contact your representatives and demand they stop these
										mandates immediately
									</li>
									<li className='flex items-start gap-3'>
										• Support EFF, Fight for the Future, and every organization
										fighting age-verification laws
									</li>
									<li className='flex items-start gap-3'>
										• Share this page with everyone you know this fight affects
										all of us
									</li>
								</ul>
							</div>
						</div>
					</div>
				);

			case 'take-action':
				return (
					<div className='space-y-12'>
						<div>
							<h2 className='text-3xl font-medium tracking-tight mb-8 text-foreground'>
								Take Action Sign Every Petition
							</h2>
							<p className='text-lg text-destructive font-medium'>
								Signing is the bare minimum. Do it, then keep fighting.
							</p>
						</div>

						<div className='space-y-6'>
							{[
								{
									title: 'Prevent Discord from implementing ID verification',
									desc: 'Change.org • Growing rapidly',
									link: 'https://www.change.org/p/prevent-discord-from-implementing-id-verification',
								},
							].map((pet, i) => (
								<div
									key={i}
									className='flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-border rounded-lg p-8 hover:border-destructive/50 transition-colors'
								>
									<div className='space-y-2'>
										<p className='font-medium text-foreground text-lg leading-tight'>
											{pet.title}
										</p>
										<p className='text-sm text-muted-foreground'>{pet.desc}</p>
									</div>
									<Button
										asChild
										variant='default'
										size='sm'
										className='sm:w-auto w-full bg-destructive hover:bg-destructive/90 font-medium'
									>
										<Link
											href={pet.link}
											target='_blank'
											rel='noopener noreferrer'
										>
											Sign Now
										</Link>
									</Button>
								</div>
							))}
						</div>

						<div className='pt-8 border-t border-border text-center'>
							<p className='text-sm text-destructive font-medium'>
								Every signature counts. But the real victory comes when we stop
								relying on centralized platforms that always sell us out
							</p>
							<p className='text-sm font-medium'>
								Feel free to add more petitions by contributing on github
							</p>
						</div>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className='min-h-[calc(100vh-4rem)] bg-background py-8 lg:py-12'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6'>
				<div className='flex flex-col lg:flex-row gap-10 lg:gap-16'>
					{/* Sidebar */}
					<aside className='lg:w-72 flex-shrink-0'>
						<div className='sticky top-8 lg:top-12'>
							<h1 className='text-2xl font-medium tracking-tight mb-8 lg:mb-10 text-foreground'>
								Discord ID Verification
							</h1>

							<nav className='space-y-1'>
								{sections.map((section) => (
									<button
										key={section.id}
										onClick={() => setActiveSection(section.id)}
										className={`w-full text-left px-5 py-3.5 rounded-md text-sm transition-colors hover:bg-muted/50
                      ${
												activeSection === section.id
													? 'bg-muted font-medium text-foreground'
													: 'text-muted-foreground hover:text-foreground'
											}`}
									>
										{section.label}
									</button>
								))}
							</nav>

							<div className='hidden lg:block mt-16 text-xs text-destructive leading-relaxed'>
								Centralized platforms always fold.
								<br />
								Decentralize or lose your voice.
							</div>
						</div>
					</aside>

					{/* Main Content */}
					<main className='flex-1 max-w-2xl pb-12 lg:pb-20'>
						{renderContent()}
					</main>
				</div>
			</div>
		</div>
	);
}

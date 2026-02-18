export default function Footer() {
	return (
		<footer className='bg-background border-t border-border mt-auto'>
			<div className='mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 py-7 text-center text-sm text-muted-foreground sm:px-6 md:flex-row md:justify-between md:gap-8 md:text-left'>
				<div>
					This website collects only anonymous user ratings. No personal data is
					stored or linked. It uses strictly necessary cookies solely to prevent
					spam and multiple submissions. Cloudflare Turnstile helps block bots
					by processing minimal device signals for security only. See{' '}
					<a
						href='https://www.cloudflare.com/turnstile-privacy-policy/'
						target='_blank'
						rel='noopener noreferrer'
						className='text-foreground hover:text-primary underline underline-offset-4 transition-colors'
					>
						Cloudflare Turnstile privacy details
					</a>
					. No analytics, ads, or data sharing occurs.
				</div>

				<a
					href='/'
					className='text-foreground font-semibold hover:text-primary transition-colors'
				>
					discordless
				</a>
			</div>
		</footer>
	);
}

'use client';

import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

interface Props {
	setToken: Dispatch<SetStateAction<string | null>>;
}

export default function TurnstileWidget({ setToken }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const widgetIdRef = useRef<string | null>(null);

	useEffect(() => {
		const loadTurnstile = () => {
			if (
				!containerRef.current ||
				typeof (window as any).turnstile === 'undefined'
			)
				return;

			// Clean up previous widget if it exists
			if (widgetIdRef.current) {
				try {
					(window as any).turnstile.remove(widgetIdRef.current);
				} catch (e) {
					console.log(e);
				}
			}

			const widgetId = (window as any).turnstile.render(containerRef.current, {
				sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY!,
				callback: (token: string) => setToken(token),
				'error-callback': () => setToken(null),
				'expired-callback': () => setToken(null),
				theme: 'dark',
				size: 'normal',
			});

			widgetIdRef.current = widgetId;
		};

		// Load script if not present
		if (!document.querySelector('script[src*="turnstile"]')) {
			const script = document.createElement('script');
			script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
			script.async = true;
			script.defer = true;
			document.head.appendChild(script);

			script.onload = loadTurnstile;
		} else {
			loadTurnstile();
		}

		return () => {
			if (widgetIdRef.current) {
				try {
					(window as any).turnstile.remove(widgetIdRef.current);
				} catch (e) {
					console.log(e);
				}
			}
		};
	}, [setToken]);

	return (
		<div className='flex justify-center my-10'>
			<div ref={containerRef} />
		</div>
	);
}

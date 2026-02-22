import { MenuIcon } from 'lucide-react';
import { Button } from './ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Link from 'next/link';

const navigationData = [
	{
		title: 'Alternatives',
		href: '/alternatives',
	},
	{
		title: 'Send a request',
		href: '/request',
	},
	{
		title: 'Why it happens?',
		href: '/why',
	},
];

export default function Header() {
	return (
		<header className='bg-background sticky top-0 z-50'>
			<div className='mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-7 sm:px-6'>
				<div className='text-muted-foreground flex flex-1 items-center gap-8 font-medium md:justify-center lg:gap-16'>
					<Link
						href='/'
						className='text-foreground flex items-center text-xl font-semibold'
					>
						discordless
					</Link>
					{navigationData.map((item, index) => (
						<Link
							key={index}
							href={item.href}
							className='hover:text-primary max-md:hidden'
						>
							{item.title}
						</Link>
					))}
				</div>

				<div className='flex items-center gap-6'>
					<DropdownMenu>
						<DropdownMenuTrigger
							className='md:hidden'
							asChild
						>
							<Button
								variant='outline'
								size='icon'
							>
								<MenuIcon />
								<span className='sr-only'>Menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className='w-56'
							align='end'
						>
							<DropdownMenuGroup>
								{navigationData.map((item, index) => (
									<DropdownMenuItem key={index}>
										<Link href={item.href}>{item.title}</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}

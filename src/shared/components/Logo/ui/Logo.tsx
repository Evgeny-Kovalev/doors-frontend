import Link from 'next/link';

import { LogoIcon } from '@/shared/icons';
import { cn } from '@/shared/ui';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Logo = ({ className }: LogoProps) => {
	return (
		<Link href={'/'} className={cn('flex items-center', className)}>
			<LogoIcon className="mr-3 size-10 text-primary sm:size-12" />
			<div className="flex flex-col">
				<div className="flex items-center text-lg font-bold !leading-none after:ml-1 after:inline-block after:h-2 after:w-2 after:rounded-full after:bg-primary after:content-[''] sm:text-lg md:text-xl lg:text-2xl">
					ДВЕРИ
				</div>
				<div className="-mb-1.5 text-nowrap text-base leading-tight lg:text-lg">
					Входные и Межкомнатные
				</div>
			</div>
		</Link>
	);
};

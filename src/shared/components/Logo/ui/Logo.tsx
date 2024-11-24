import Link from 'next/link';

import { LogoIcon } from '@/shared/icons';
import { cn } from '@/shared/ui/utils';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Logo = ({ className }: LogoProps) => {
	return (
		<div className={cn(className)}>
			<Link href={'/'} className={cn('inline-flex items-center')}>
				<div className="mr-3">
					<LogoIcon className="h-10 text-primary sm:h-12" />
				</div>
				<div className="flex flex-col">
					<div className="flex items-center text-lg font-bold leading-tight after:ml-1 after:inline-block after:h-2 after:w-2 after:rounded-full after:bg-primary after:content-[''] sm:text-lg md:text-xl lg:text-2xl">
						ДВЕРИ
					</div>
					<div className="text-nowrap  text-base leading-tight lg:text-lg">
						Входные и Межкомнатные
					</div>
				</div>
			</Link>
		</div>
	);
};

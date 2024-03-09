import { cn } from '@/shared/ui/utils';
import Link from 'next/link';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Logo({ className }: LogoProps) {
	return (
		<div className={cn(className)}>
			<Link href={'/'} className={cn('flex items-center')}>
				<div className="mr-3">
					<div className="h-10 w-10 rounded-full bg-primary sm:h-12 sm:w-12"></div>
				</div>
				<div className="flex flex-col">
					<div className="flex items-center text-base font-bold leading-tight after:ml-1 after:inline-block after:h-2 after:w-2 after:rounded-full after:bg-primary after:content-[''] sm:text-lg">
						ДВЕРИ
					</div>
					<div className="text-nowrap text-xs leading-tight sm:text-sm md:text-base">
						Входные и Межкомнатные
					</div>
				</div>
			</Link>
		</div>
	);
}

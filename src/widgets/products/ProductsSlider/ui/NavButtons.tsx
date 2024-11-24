import { ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/ui/utils';

export const ButtonPrev = ({
	className,
	onClick,
	...props
}: React.HTMLAttributes<HTMLButtonElement>) => {
	return (
		<Button
			className={cn(
				'z-40 h-10 w-10 rounded-full p-3 hover:bg-primary-accent',
				className,
			)}
			onClick={onClick}
			{...props}
		>
			<ChevronsLeft width={20} height={20} color="white" />
		</Button>
	);
};

export const ButtonNext = ({
	className,
	onClick,
	...props
}: React.HTMLAttributes<HTMLButtonElement>) => {
	return (
		<Button
			className={cn(
				'z-40 h-10 w-10 rounded-full p-3 hover:bg-primary-accent',
				className,
			)}
			onClick={onClick}
			{...props}
		>
			<ChevronsRight width={20} height={20} color="white" />
		</Button>
	);
};

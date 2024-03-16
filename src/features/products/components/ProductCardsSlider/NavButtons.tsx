import { Button } from '@/shared/ui/button';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

export const ButtonPrev = (props: React.HTMLAttributes<HTMLButtonElement>) => {
	return (
		<Button
			className="absolute left-0 top-1/2 z-40 h-10 w-10 rounded-full p-3 hover:bg-accent"
			onClick={props.onClick}
		>
			<ChevronsLeft width={20} height={20} color="white" />
		</Button>
	);
};

export const ButtonNext = (props: React.HTMLAttributes<HTMLButtonElement>) => {
	return (
		<Button
			className="absolute right-0 top-1/2 z-40 h-10 w-10 rounded-full p-3 hover:bg-accent"
			onClick={props.onClick}
		>
			<ChevronsRight width={20} height={20} color="white" />
		</Button>
	);
};

import { Button } from '@/shared/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ArrowPrev = (props: React.HTMLAttributes<HTMLButtonElement>) => {
	return (
		<Button
			className="hover:bg-primary-accent absolute left-0 top-1/2 z-10 h-11 w-7 -translate-y-1/2 cursor-pointer rounded-r-full bg-primary p-0 text-white transition-[width] hover:w-8 hover:shadow-[0_0_10px_rgba(0,0,0,.12)]"
			onClick={props.onClick}
		>
			<ChevronLeft className="absolute right-[5px] top-1/2 -translate-y-1/2" />
		</Button>
	);
};

export const ArrowNext = (props: React.HTMLAttributes<HTMLButtonElement>) => {
	return (
		<Button
			className="hover:bg-primary-accent absolute right-0 top-1/2 z-10 h-11 w-7 -translate-y-1/2 cursor-pointer rounded-l-full bg-primary p-0 text-white transition-[width] hover:w-8 hover:shadow-[0_0_10px_rgba(0,0,0,.12)]"
			onClick={props.onClick}
		>
			<ChevronRight className="absolute left-[5px] top-1/2 -translate-y-1/2" />
		</Button>
	);
};

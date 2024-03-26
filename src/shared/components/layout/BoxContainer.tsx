import { Box } from '@/shared/ui/box';
import { cn } from '@/shared/ui/utils';

interface BoxContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function BoxContainer({
	className,
	children,
	...props
}: BoxContainerProps) {
	return (
		<div className={cn('container px-2 py-5 sm:px-4', className)} {...props}>
			<Box>{children}</Box>
		</div>
	);
}

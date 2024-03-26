import { cn } from '@/shared/ui/utils';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function PageContainer({
	className,
	children,
	...props
}: PageContainerProps) {
	return (
		<div className={cn('container px-2 py-5 sm:px-4', className)} {...props}>
			{children}
		</div>
	);
}

import { cn } from '@/shared/ui/utils';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function PageContainer({
	className,
	children,
	...props
}: PageContainerProps) {
	return (
		<div className={cn('container py-5', className)} {...props}>
			{children}
		</div>
	);
}

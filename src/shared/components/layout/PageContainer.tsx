import {
	Box,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	cn,
} from '@/shared/ui';
import Link from 'next/link';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	breadcrumbsItems?: { label: string; href: string }[] | null;
	withoutBox?: boolean;
	boxClassName?: string;
}

export function PageContainer({
	className,
	boxClassName,
	withoutBox,
	children,
	breadcrumbsItems,
	...props
}: PageContainerProps) {
	return (
		<>
			<div className={cn('container p-2 sm:p-4', className)} {...props}>
				{breadcrumbsItems && (
					<Box className="mb-3 w-fit px-3 py-2 md:px-5">
						<Breadcrumb>
							<BreadcrumbList>
								{breadcrumbsItems.map((item, index) => (
									<BreadcrumbItem key={item.label}>
										{item.href && index !== breadcrumbsItems.length - 1 ? (
											<BreadcrumbLink asChild>
												<Link href={item.href}>{item.label}</Link>
											</BreadcrumbLink>
										) : (
											<BreadcrumbPage>{item.label}</BreadcrumbPage>
										)}
										{index < breadcrumbsItems.length - 1 && (
											<BreadcrumbSeparator />
										)}
									</BreadcrumbItem>
								))}
							</BreadcrumbList>
						</Breadcrumb>
					</Box>
				)}
				{withoutBox ? (
					children
				) : (
					<Box className={cn('h-full px-3 md:px-4 lg:px-5', boxClassName)}>
						{children}
					</Box>
				)}
			</div>
		</>
	);
}

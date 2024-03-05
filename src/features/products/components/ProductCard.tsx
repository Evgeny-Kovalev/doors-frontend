import { ProductApiResponse } from '@/shared/types';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/shared/ui/card';
import { cn } from '@/shared/ui/utils';
import Image from 'next/image';

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
	product: ProductApiResponse;
}
export default function ProductCard({ product, className, ...props }: ProductCardProps) {
	return (
		<>
			<Card className={cn(className)} {...props}>
				<CardContent className="relative px-0 pb-3">
					<Image
						src={product.imgPath}
						className="h-auto w-full"
						sizes="100vw"
						width={0}
						height={0}
						alt="Product image"
						priority
					/>
				</CardContent>
				<CardFooter>
					<div className="mx-auto text-center">
						<CardTitle className="text-md mb-2 hover:text-accent">
							{product.name}
						</CardTitle>
						<div className="text-md mb-2 font-bold text-accent">Цену уточняйте</div>
						<div className="text-md mb-2 font-bold">(за комплект)</div>
						<Button>Подробнее</Button>
					</div>
				</CardFooter>
			</Card>
		</>
	);
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import ProductDescription from './ProductDescription';
import ProductDetails from './ProductDetails';
import { ProductApiResponse } from '@/shared/types';
import { Card, CardContent } from '@/shared/ui/card';

interface Props {
	product: ProductApiResponse;
}

export default function ProductContent({ product }: Props) {
	return (
		<Card>
			<CardContent className="pt-6">
				<Tabs defaultValue="description">
					<TabsList>
						<TabsTrigger value="description">Описание</TabsTrigger>
						<TabsTrigger value="details">Характеристики</TabsTrigger>
					</TabsList>
					<TabsContent value="description">
						<ProductDescription product={product} />
					</TabsContent>
					<TabsContent value="details">
						<ProductDetails product={product} />
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}

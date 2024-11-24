import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { ProductApiResponse } from '@/shared/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

import { ProductParamsTable } from './ProductParamsTable';

interface Props {
	product: ProductApiResponse;
}

export const ProductContent = ({ product }: Props) => {
	return (
		<Tabs defaultValue="description">
			<TabsList>
				<TabsTrigger value="description">Описание</TabsTrigger>
				<TabsTrigger value="details">Характеристики</TabsTrigger>
			</TabsList>
			<TabsContent value="description">
				<Card>
					<CardHeader className="px-7">
						<CardTitle>Описание</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="whitespace-pre-line">{product.category.description}</p>
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="details">
				<Card>
					<CardHeader className="px-7">
						<CardTitle>Характеристики</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="rounded-lg border xl:w-2/3">
							<ProductParamsTable params={product.params} />
						</div>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
};

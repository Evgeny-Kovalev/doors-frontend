import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/shared/ui';
import { ProductApiResponse } from '@/shared/types';
import { ProductParamsTable } from './ProductParamsTable';

interface Props {
	product: ProductApiResponse;
}

export const ProductContent = ({ product }: Props) => {
	return (
		<Tabs defaultValue="details">
			<TabsList>
				<TabsTrigger value="details">Характеристики</TabsTrigger>
				<TabsTrigger value="description">Описание</TabsTrigger>
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

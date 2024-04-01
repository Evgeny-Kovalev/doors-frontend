import { CategoryCard } from '@/features/categories/components/CategoryCard';
import { ProductCardsSlider } from '@/features/products/components/ProductCardsSlider';
import PageContainer from '@/shared/components/layout/PageContainer';
import { CollectionApiResponse } from '@/shared/types';
import MainBanners from '@/widgets/MainBanners';

const fetchCollection = async (
	collectionId: number,
): Promise<CollectionApiResponse | null> => {
	const res = await fetch(`${process.env.API_URL}/collections/${collectionId}`);
	if (!res.ok) return null;
	const collection: CollectionApiResponse = await res.json();
	return collection;
};

export default async function Home() {
	const [
		exteriorDoorsFavorite,
		interiorDoorsFavorite,
		interiorDoorsSamples,
		exteriorDoors1,
		favoriteCategories,
	] = await Promise.all([
		fetchCollection(1),
		fetchCollection(2),
		fetchCollection(3),
		fetchCollection(4),
		fetchCollection(5),
	]);

	return (
		<PageContainer>
			<section className="mb-10">
				<MainBanners />
			</section>
			{interiorDoorsSamples && interiorDoorsSamples.products.length > 0 && (
				<section className="mb-10">
					<h3 className="mb-5 border-b pb-2 text-3xl font-bold">
						<span className="uppercase text-primary-accent">
							Распродажа выставочных образцов |
						</span>{' '}
						Межкомнатные двери
					</h3>
					<ProductCardsSlider products={interiorDoorsSamples.products} />
				</section>
			)}
			{favoriteCategories && favoriteCategories.categories.length > 0 && (
				<section className="mb-10">
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{favoriteCategories.categories.map((cat) => (
							<CategoryCard key={cat.id} category={cat} />
						))}
					</div>
				</section>
			)}
			{exteriorDoors1 && exteriorDoors1.products.length > 0 && (
				<section className="mb-10">
					<h3 className="mb-5 border-b pb-2 text-3xl font-bold">
						<span className="uppercase text-primary-accent">Хит продаж |</span>{' '}
						Двери РБ (г. Могилев)
					</h3>
					<ProductCardsSlider products={exteriorDoors1.products} />
				</section>
			)}
			{exteriorDoorsFavorite && exteriorDoorsFavorite.products.length > 0 && (
				<section className="mb-10">
					<h3 className="mb-5 border-b pb-2 text-3xl font-bold">
						<span className="uppercase text-primary-accent">
							Популяные модели |
						</span>{' '}
						Входные двери
					</h3>
					<ProductCardsSlider products={exteriorDoorsFavorite.products} />
				</section>
			)}
			{interiorDoorsFavorite && interiorDoorsFavorite.products.length > 0 && (
				<section className="mb-10">
					<h3 className="mb-5 border-b-2 pb-2 text-3xl font-bold">
						<span className="uppercase text-primary-accent">
							Популяные модели |
						</span>{' '}
						Межкомнатные двери
					</h3>
					<ProductCardsSlider products={interiorDoorsFavorite.products} />
				</section>
			)}
		</PageContainer>
	);
}

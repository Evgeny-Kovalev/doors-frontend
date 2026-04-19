import { fetchCollection } from '@/entities/collection';
import { PageContainer } from '@/shared/components';

import { ProductCardsSlider } from '@/widgets/products';
import { MainBanners } from '@/widgets/MainBanners';
import { CallbackSection } from '@/widgets/CallbackSection';
import { CategoryCard } from '@/entities/category';
import { AdvantageList } from '@/widgets/advantages/';

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
		<PageContainer className="flex flex-col gap-10" withoutBox>
			<h1 className="sr-only">Двери</h1>
			<h2 className="sr-only">Входные и межкомнатные</h2>
			<section>
				<MainBanners />
			</section>
			<section>
				<h3 className="mb-5 border-b pb-2 text-center text-3xl font-bold uppercase text-primary-accent">
					Почему выбирают нас?
				</h3>
				<AdvantageList />
			</section>
			{interiorDoorsSamples && interiorDoorsSamples.products.length > 0 && (
				<section>
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
				<section>
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{favoriteCategories.categories.map((cat) => (
							<CategoryCard key={cat.id} category={cat}  orientation='horizontal'/>
						))}
					</div>
				</section>
			)}
			<CallbackSection />
			{exteriorDoors1 && exteriorDoors1.products.length > 0 && (
				<section>
					<h3 className="mb-5 border-b pb-2 text-3xl font-bold">
						<span className="uppercase text-primary-accent">Хит продаж |</span>{' '}
						Двери РБ (г. Могилев)
					</h3>
					<ProductCardsSlider products={exteriorDoors1.products} />
				</section>
			)}
			{exteriorDoorsFavorite && exteriorDoorsFavorite.products.length > 0 && (
				<section>
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
				<section>
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

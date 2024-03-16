'use client';
import ProductCardsSlider from '@/features/products/components/ProductCardsSlider';
import PageContainer from '@/shared/components/layout/PageContainer';
import MainBanners from '@/widgets/MainBanners';

export default function Home() {
	return (
		<PageContainer>
			<MainBanners className="mb-10" />
			{/* <ProductCardsSlider /> */}
		</PageContainer>
	);
}

import { cn, AspectRatio } from '@/shared/ui';
import Image from 'next/image';
import MainSlider from './MainSlider';
import { MAIN_PAGE } from '@/shared/constants';
import Link from 'next/link';

interface MainBannersProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MainBanners = ({ className, ...props }: MainBannersProps) => {
	return (
		<div className={cn('grid grid-cols-12 gap-5', className)} {...props}>
			<div className="relative col-span-12 row-span-2 object-fill lg:col-span-8">
				<div className="aspect-[16/10] h-full w-auto max-w-full">
					<MainSlider />
				</div>
			</div>
			{MAIN_PAGE.banner.items.map(({ imgUrl, urlTo }) => (
				<div
					key={imgUrl}
					className="relative col-span-12 object-fill sm:col-span-6 lg:col-span-4"
				>
					{urlTo ? (
						<Link href={urlTo}>
							<AspectRatio ratio={16 / 10}>
								<Image
									width={800}
									height={500}
									priority
									className="h-full w-full"
									src={imgUrl}
									alt="Banner item"
								/>
							</AspectRatio>
						</Link>
					) : (
						<AspectRatio ratio={16 / 10}>
							<Image
								width={800}
								height={500}
								priority
								className="h-full w-full"
								src={imgUrl}
								alt="Banner item"
							/>
						</AspectRatio>
					)}
				</div>
			))}
		</div>
	);
};

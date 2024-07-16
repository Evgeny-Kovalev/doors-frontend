import { cn } from '@/shared/ui/utils';
import Image from 'next/image';
import MainSlider from './MainSlider';
import { MAIN_PAGE } from '@/shared/constants';
import Link from 'next/link';

interface MainBannersProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MainBanners = ({ className, ...props }: MainBannersProps) => {
	return (
		<div className={cn('grid grid-cols-12 gap-5', className)} {...props}>
			<div className="relative col-span-12 row-span-2 object-fill lg:col-span-8">
				<MainSlider />
			</div>
			{MAIN_PAGE.banner.items.map(({ imgUrl, urlTo }) => (
				<div
					key={imgUrl}
					className="relative col-span-12 object-fill sm:col-span-6 lg:col-span-4"
				>
					{urlTo ? (
						<Link href={urlTo}>
							<Image
								width={800}
								height={500}
								priority
								className="h-full w-full"
								src={imgUrl}
								alt="Banner item"
							/>
						</Link>
					) : (
						<Image
							width={800}
							height={500}
							priority
							className="h-full w-full"
							src={imgUrl}
							alt="Banner item"
						/>
					)}
				</div>
			))}
		</div>
	);
};

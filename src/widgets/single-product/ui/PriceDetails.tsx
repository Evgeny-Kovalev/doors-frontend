import { DoorCasingIcon, DoorFrameIcon, DoorIcon } from '@/shared/icons';

interface PriceDetailsProps {}

export const PriceDetails = ({}: PriceDetailsProps) => {
	return (
		<div className="flex flex-wrap items-center justify-between gap-2 text-muted-foreground">
			<figure className="flex items-center">
				<DoorIcon className="mr-2 h-10 w-10 text-primary" />
				<figcaption>Полотно</figcaption>
			</figure>
			<figure className="flex items-center">
				<DoorFrameIcon className="mr-2 h-10 w-10 text-primary" />
				<figcaption>Коробка (2.5шт)</figcaption>
			</figure>
			<figure className="flex items-center">
				<DoorCasingIcon className="mr-2 h-10 w-10 text-primary" />
				<figcaption>Наличник (5шт)</figcaption>
			</figure>
		</div>
	);
};

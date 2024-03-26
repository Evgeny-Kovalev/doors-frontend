interface PriceDetailsProps {}

export const PriceDetails = ({}: PriceDetailsProps) => {
	return (
		<div className="flex flex-wrap items-center justify-between gap-2 text-muted-foreground">
			<figure className="flex items-center">
				{/* //!FIX: create icons   */}
				<div className="mr-3 h-10 w-10 rounded-lg bg-primary"></div>
				<figcaption>
					<span>Полотно</span>
				</figcaption>
			</figure>
			<figure className="flex items-center">
				{/* //!FIX: create icons   */}
				<div className="mr-3 h-10 w-10 rounded-lg bg-primary"></div>
				<figcaption>
					<span>Коробка (2.5шт)</span>
				</figcaption>
			</figure>
			<figure className="flex items-center">
				{/* //!FIX: create icons   */}
				<div className="mr-3 h-10 w-10 rounded-lg bg-primary"></div>
				<figcaption>
					<span>Наличник (5шт)</span>
				</figcaption>
			</figure>
		</div>
	);
};

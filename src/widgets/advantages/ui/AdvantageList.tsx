import { cn } from '@/shared/ui';
import {
	CalendarRange,
	Truck,
	BadgePercent,
	Ruler,
	VectorSquare,
	UserCog2,
} from 'lucide-react';

export const AdvantageList = ({ className }: { className?: string }) => {
	const data = [
		{ icon: <CalendarRange />, text: '12 лет на рынке' },
		{ icon: <Truck />, text: 'Бесплатная доставка' },
		{ icon: <BadgePercent />, text: 'Рассрочка до 8 месяцев' },
		{ icon: <Ruler />, text: 'Бесплатный замер' },
		{ icon: <VectorSquare />, text: 'Нестандартные размеры' },
		{ icon: <UserCog2 />, text: 'Индивидуальный подход' },
	];

	return (
		<ul
			className={cn(
				'mx-auto grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6',
				className,
			)}
		>
			{data.map(({ icon, text }, i) => (
				<li key={i} className="flex flex-col items-center justify-start gap-2">
					<div className="flex size-16 items-center justify-center rounded-lg border border-gray-100 bg-white text-primary [&_svg]:size-7">
						{icon}
					</div>
					<span className="text-center text-lg font-bold leading-tight">{text}</span>
				</li>
			))}
		</ul>
	);
};

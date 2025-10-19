import { Clock } from 'lucide-react';

interface WorkingHoursListProps extends React.HTMLAttributes<HTMLUListElement> {}

export const WorkingHoursList = ({ className }: WorkingHoursListProps) => {
	return (
		<ul className={className}>
			<li className="mb-1 flex items-center">
				<Clock className="mr-2 h-full max-h-4 w-full max-w-4 self-center " />
				<span>Вт-Пт: 11:00 - 18:00</span>
			</li>
			<li className="flex items-center">
				<Clock className="mr-2 h-full max-h-4 w-full max-w-4 self-center " />
				<span>Сб-Вс: 11:00 - 16:00</span>
			</li>
		</ul>
	);
};

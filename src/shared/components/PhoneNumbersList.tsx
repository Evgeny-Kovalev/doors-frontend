import { Phone } from 'lucide-react';
import { cn } from '../ui/utils';

interface PhoneNumbersListProps extends React.HTMLAttributes<HTMLUListElement> {}

export default function PhoneNumbersList({ className }: PhoneNumbersListProps) {
	return (
		<ul className={cn(className)}>
			<li className="mb-1 flex items-center">
				<Phone height={15} width={15} className="mr-2 self-center " />
				<a className="hover:text-accent" href="tel:+375293278958">
					+375 (29) 327-89-58
				</a>
			</li>
			<li className="flex items-center">
				<Phone height={15} width={15} className="mr-2 self-center " />
				<a className="hover:text-accent" href="tel:+375256727768">
					+375 (25) 672-77-68
				</a>
			</li>
		</ul>
	);
}

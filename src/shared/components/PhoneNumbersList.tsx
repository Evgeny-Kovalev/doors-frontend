import { Phone } from 'lucide-react';
import { cn } from '../ui/utils';
import { SHOP_INFO } from '../constants';

interface PhoneNumbersListProps extends React.HTMLAttributes<HTMLUListElement> {}

export default function PhoneNumbersList({ className }: PhoneNumbersListProps) {
	return (
		<ul className={cn(className)}>
			{SHOP_INFO.phones.map((phone) => (
				<li key={phone.label} className="mb-1 flex items-center last:mb-0">
					<Phone height={15} width={15} className="mr-2 self-center " />
					<a className="hover:text-primary-accent" href={'tel:' + phone.tel}>
						{phone.label}
					</a>
				</li>
			))}
		</ul>
	);
}

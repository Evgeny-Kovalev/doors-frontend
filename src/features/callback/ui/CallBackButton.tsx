import { Button, cn, type ButtonProps } from '@/shared/ui';
import { Phone } from 'lucide-react';

export const CallBackButton = ({ className, title, ...props }: ButtonProps) => {
	return (
		<Button className={cn('w-full', className)} {...props}>
			<Phone size={15} className="mr-2" />
			{title || 'Обратный звонок'}
		</Button>
	);
};

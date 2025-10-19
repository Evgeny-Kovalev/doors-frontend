import { Button, cn, type ButtonProps } from '@/shared/ui';
import { Phone } from 'lucide-react';

export const CallBackButton = ({ className, title, ...props }: ButtonProps) => {
	return (
		<Button className={cn('flex w-full items-center gap-2', className)} {...props}>
			<Phone size={14} />
			{title || 'Обратный звонок'}
		</Button>
	);
};

import { Button, cn, type ButtonProps } from '@/shared/ui';
import { Phone } from 'lucide-react';

export const CallBackButton = ({ className, ...props }: ButtonProps) => {
	return (
		<Button className={cn('flex w-full items-center', className)} {...props}>
			<Phone className="mr-2" width={14} height={14} />
			Обратный звонок
		</Button>
	);
};

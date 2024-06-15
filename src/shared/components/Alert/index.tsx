import { Alert, AlertTitle, AlertDescription } from '@/shared/ui/alert';
import { AlertCircle } from 'lucide-react';

interface AlertProps {
	title?: string;
	children: React.ReactNode;
}

export const AlertDestructive = ({ title = 'Ошибка', children }: AlertProps) => {
	return (
		<Alert variant="destructive">
			<AlertCircle className="h-4 w-4" />
			<AlertTitle>{title}</AlertTitle>
			<AlertDescription>{children}</AlertDescription>
		</Alert>
	);
};

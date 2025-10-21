import { AttributeApiResponse } from '@/shared/types';
import { cn, Table, TableBody, TableCell, TableRow } from '@/shared/ui';

interface ProductParamsTableProps {
	params: AttributeApiResponse[];
}

export const ProductParamsTable = ({ params }: ProductParamsTableProps) => {
	return (
		<Table>
			<TableBody>
				{params.map((param, i) => (
					<TableRow key={param.id} className={cn({ 'bg-muted/50': i % 2 !== 0 })}>
						<TableCell className="font-medium">{param.key.label}</TableCell>
						<TableCell>{param.value.value}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

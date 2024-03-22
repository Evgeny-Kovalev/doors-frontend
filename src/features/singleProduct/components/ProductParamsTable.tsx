import { AttributeApiResponse } from '@/shared/types';
import { Table, TableBody, TableCell, TableRow } from '@/shared/ui/table';
import { cn } from '@/shared/ui/utils';

interface ProductParamsTableProps {
	params: AttributeApiResponse[];
}

export default function ProductParamsTable({ params }: ProductParamsTableProps) {
	return (
		<Table>
			<TableBody>
				{params.map((param, i) => (
					<TableRow key={param.id} className={cn({ 'bg-muted/50': i % 2 !== 0 })}>
						<TableCell className="font-medium">{param.name}</TableCell>
						<TableCell>{param.value}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

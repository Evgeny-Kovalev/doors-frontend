import { ProductConstructorResponse } from '../model';
import data from './data.json';

export const fetchProductConstructorData =
	async (): Promise<ProductConstructorResponse | null> => {
		return data;
	};

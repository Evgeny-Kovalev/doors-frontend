export type IMenuItem = {
	slug: string;
	label: string;
	link: string;
	children?: IMenuItem[];
};

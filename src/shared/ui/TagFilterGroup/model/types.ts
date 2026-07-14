export interface FilterItem {
	id: number | string;
	label: string;
	icon?: string;
	values?: string[];
}

export interface TagFilterGroupTypes {
  title: string;
  items: FilterItem[];
	selectedId: number | string | string[] | number[] | null;
	onSelect: (id: number | string)=>void;
}
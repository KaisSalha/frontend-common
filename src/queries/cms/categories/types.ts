import { Content } from "types";

export interface Category {
	id: string;
	name: string;
	slug: string;
	description: string;
	content: Content;
}

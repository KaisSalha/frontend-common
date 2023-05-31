export type Locale = "en" | "ar" | string | undefined;

export type Content = {
	type?: string;
	children: Content[];
	bold?: boolean;
	code?: boolean;
	italic?: boolean;
	url?: string;
	text?: string;
};

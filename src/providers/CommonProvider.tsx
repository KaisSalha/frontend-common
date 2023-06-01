import React, { ReactNode } from "react";
import { Locale } from "../types";
import { LocaleProvider } from "./LocaleProvider";

interface Props {
	children: ReactNode;
	locale: Locale;
}

export const CommonProvider: React.FC<Props> = ({ children, locale }) => (
	<LocaleProvider defaultLocale={locale}>{children}</LocaleProvider>
);

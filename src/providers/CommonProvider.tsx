import React, { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { Locale, LocaleProvider } from "./LocaleProvider";

interface Props {
	children: ReactNode;
	locale: Locale;
}

export const CommonProvider: React.FC<Props> = ({ children, locale }) => (
	<AuthProvider>
		<LocaleProvider defaultLocale={locale}>{children}</LocaleProvider>
	</AuthProvider>
);

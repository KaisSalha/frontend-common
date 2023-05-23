import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { Locale } from "types";

export const LocaleContext = createContext<{
	locale: Locale;
	setLocale: (locale: Locale) => void;
}>({
	locale: "en",
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setLocale: () => {},
});

interface Props {
	children: ReactNode;
	defaultLocale: Locale;
}

export const LocaleProvider: React.FC<Props> = ({
	children,
	defaultLocale,
}) => {
	const [locale, setLocale] = useState<Locale>(defaultLocale || "en");

	useEffect(() => {
		if (locale !== defaultLocale) setLocale(defaultLocale);
	}, [defaultLocale, locale]);

	const value = useMemo(
		() => ({
			locale,
			setLocale,
		}),
		[locale]
	);

	return (
		<LocaleContext.Provider value={value}>
			{children}
		</LocaleContext.Provider>
	);
};

export const useLocale = () => {
	const { locale, setLocale } = useContext(LocaleContext);

	return { locale, setLocale };
};

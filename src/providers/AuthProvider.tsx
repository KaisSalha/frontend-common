import React, {
	createContext,
	ReactNode,
	useEffect,
	useMemo,
	useState,
} from "react";
import { Hub } from "@aws-amplify/core";
import { Auth } from "@aws-amplify/auth";
import { useQueryClient } from "@tanstack/react-query";

export const AuthContext = createContext<{
	authenticated: boolean | null;
}>({
	authenticated: false,
});

interface Props {
	children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
	const [authenticated, setAuthenticated] = useState<boolean | null>(null);
	const queryClient = useQueryClient();

	useEffect(() => {
		Auth.currentAuthenticatedUser()
			.then(() => {
				setAuthenticated(true);
			})
			.catch(() => setAuthenticated(false));

		Hub.listen("auth", ({ payload: { event } }) => {
			switch (event) {
				case "signIn":
					setAuthenticated(true);
					break;
				case "signOut":
					setAuthenticated(false);
					queryClient.clear();
					break;
				default:
					break;
			}
		});
	}, [queryClient]);

	const value = useMemo(
		() => ({
			authenticated,
		}),
		[authenticated]
	);

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

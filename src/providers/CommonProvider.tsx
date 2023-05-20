import React, { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";

interface Props {
	children: ReactNode;
}

export const CommonProvider: React.FC<Props> = ({ children }) => (
	<AuthProvider>{children}</AuthProvider>
);

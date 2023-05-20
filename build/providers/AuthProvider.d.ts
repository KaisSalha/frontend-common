import React, { ReactNode } from "react";
export declare const AuthContext: React.Context<{
    authenticated: boolean | null;
}>;
interface Props {
    children: ReactNode;
}
export declare const AuthProvider: React.FC<Props>;
export {};

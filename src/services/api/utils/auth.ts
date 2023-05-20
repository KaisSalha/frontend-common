import { Auth } from "@aws-amplify/auth";

export const getJWT = async (): Promise<string | null> => {
	const currentSession = await Auth.currentSession();
	const idToken = currentSession.getIdToken();
	const jwt = idToken.getJwtToken();

	return jwt;
};
